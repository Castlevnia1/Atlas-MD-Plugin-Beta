require("./Configurations");
const {
  default: WASocket,
  DisconnectReason,
  delay,
  fetchLatestBaileysVersion,
  useSingleFileAuthState,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const express = require("express");
const figlet = require("figlet");
const { join } = require("path");
const pino = require("pino");
const path = require("path");
const FileType = require('file-type');
const { Boom } = require("@hapi/boom");
const Collections = require("./System/Collections");
const { state, saveState } = useSingleFileAuthState("./session.json");
const commands = new Collections();
const { serialize, WAConnection } = require("./System/whatsapp.js");
commands.prefix = "/";

const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store",
  }),
});

//Reading command files

const readcommands = async () => {
  const cmdfile = fs
    .readdirSync("./Plugins")
    .filter((file) => file.endsWith(".js"));
  for (const file of cmdfile) {
    const cmdfiles = require(`./Plugins/${file}`);
    commands.set(cmdfiles.name, cmdfiles);
  }
};
readcommands();

// Atlas Server configuration

console.log(
  figlet.textSync("ATLAS", {
    font: "Standard",
    horizontalLayout: "default",
    vertivalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  })
);
console.log(`\n`);

const startAtlas = async () => {
  const options = {
    version: (await fetchLatestBaileysVersion()).version,
    printQRInTerminal: true,
    auth: state,
    logger: pino({
      level: "silent",
    }),
    browser: ["Atlas", "Safari", "1.0.0"],
  };
  const Atlas = new WAConnection(WASocket(options));
  Atlas.ev.on("creds.update", saveState);

  Atlas.ev.on("connection.update", async (update) => {
    const { lastDisconnect, connection } = update;
    if (connection) {
      console.info(`[ ATLAS ] Server Status => ${connection}`);
    }

    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(
          `[ ATLAS ] Bad Session File, Please Delete Session and Scan Again.\n`
        );
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("[ ATLAS ] Connection closed, reconnecting....\n");
        startAtlas();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("[ ATLAS ] Connection Lost from Server, reconnecting...\n");
        startAtlas();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "[ ATLAS ] Connection Replaced, Another New Session Opened, Please Close Current Session First!\n"
        );
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        clearState();
        console.log(
          `[ ATLAS ] Device Logged Out, Please Delete Session and Scan Again.\n`
        );
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("[ ATLAS ] Server Restarting...\n");
        startAtlas();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("[ ATLAS ] Connection Timed Out, Trying to Reconnect...\n");
        startAtlas();
      } else {
        console.log(
          `[ ATLAS ] Server Disconnected: "It's either safe disconnect or WhatsApp Account got banned !\n"`
        );
      }
    }
  });

  Atlas.ev.on("messages.upsert", async (chatUpdate) => {
    m = serialize(Atlas, chatUpdate.messages[0]);

    if (!m.message) return;
    if (m.key && m.key.remoteJid == "status@broadcast") return;
    if (m.key.id.startsWith("BAE5") && m.key.id.length == 16) return;

    require("./Core.js")(Atlas, m, commands, chatUpdate);
  });

  Atlas.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  Atlas.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = Atlas.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = {
          id,
          name: contact.notify,
        };
    }
  });

  Atlas.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  Atlas.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };

  Atlas.parseMention = async (text) => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (v) => v[1] + "@s.whatsapp.net"
    );
  };

  Atlas.sendText = (jid, text, quoted = "", options) =>
    Atlas.sendMessage(
      jid,
      {
        text: text,
        ...options,
      },
      {
        quoted,
      }
    );

    Atlas.getFile = async (PATH, save) => {
      let res
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)

      let type = await FileType.fromBuffer(data) || {
          mime: 'application/octet-stream',
          ext: '.bin'
      }
      filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
      if (data && save) fs.promises.writeFile(filename, data)
      return {
          res,
          filename,
          size: await getSizeMedia(data),
          ...type,
          data
      }
  }

  Atlas.setStatus = (status) => {
    Atlas.query({
        tag: 'iq',
        attrs: {
            to: '@s.whatsapp.net',
            type: 'set',
            xmlns: 'status',
        },
        content: [{
            tag: 'status',
            attrs: {},
            content: Buffer.from(status, 'utf-8')
        }]
    })
    return status
}

    Atlas.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
    let types = await Atlas.getFile(PATH, true);
    let { filename, size, ext, mime, data } = types;
    let type = "",
      mimetype = mime,
      pathFile = filename;
    if (options.asDocument) type = "document";
    if (options.asSticker || /webp/.test(mime)) {
      let { writeExif } = require("./lib/sticker.js");
      let media = {
        mimetype: mime,
        data,
      };
      pathFile = await writeExif(media, {
        packname: global.packname,
        author: global.packname,
        categories: options.categories ? options.categories : [],
      });
      await fs.promises.unlink(filename);
      type = "sticker";
      mimetype = "image/webp";
    } else if (/image/.test(mime)) type = "image";
    else if (/video/.test(mime)) type = "video";
    else if (/audio/.test(mime)) type = "audio";
    else type = "document";
    await Atlas.sendMessage(
      jid,
      {
        [type]: {
          url: pathFile,
        },
        mimetype,
        fileName,
        ...options,
      },
      {
        quoted,
        ...options,
      }
    );
    return fs.promises.unlink(pathFile);
  };
};

startAtlas();

const PORT = port;
const app = express();

app.use("/", express.static(join(__dirname, "Frontend")));

app.listen(PORT, () => {});
