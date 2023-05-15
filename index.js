require("./Configurations");
const {
  default: atlasConnect,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  downloadContentFromMessage,
  makeInMemoryStore,
  BufferJSON,
  initAuthCreds,
  jidDecode,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const figlet = require("figlet");
const { join } = require("path");
const got = require("got");
const pino = require("pino");
const path = require("path");
const FileType = require("file-type");
const { Boom } = require("@hapi/boom");
const Collections = require("./System/Collections");
const { state, saveCreds } = useMultiFileAuthState("./Session/session.json");
const { serialize, WAConnection } = require("./System/whatsapp.js");
const { smsg, getBuffer, getSizeMedia } = require("./System/Function2");
const express = require("express");
const welcomeLeft = require("./System/Welcome.js");
const { readcommands, commands } = require("./System/ReadCommands.js");
commands.prefix = global.prefa;

const {
  pluginData, // -------------------- GET ALL PLUGIN DATA FROM DATABASE
} = require("./System/MongoDB/MongoDB_Schema");

const chalk = require("chalk");
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store",
  }),
});
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

class FileStorage {
  constructor() {
    this.fileCache = new Map();
  }

  async loadFile(fileName) {
    if (this.fileCache.has(fileName)) {
      return this.fileCache.get(fileName);
    }

    try {
      const fileContent = await readFile(fileName, "utf-8");
      if (fileContent.length > 0) {
        const content = JSON.parse(fileContent, BufferJSON.reviver);
        this.fileCache.set(fileName, content);
        return content;
      }
    } catch (error) {
      // Do nothing if the file does not exist
    }

    return null;
  }

  async saveFile(fileName, content) {
    const serializedContent = JSON.stringify(content, BufferJSON.replacer, 2);
    await writeFile(fileName, serializedContent);
  }

  async deleteFile(fileName) {
    try {
      await unlink(fileName);
    } catch (error) {
      // Do nothing if the file does not exist
    }
  }
}

class AuthenticationFromFile {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.fileStorage = new FileStorage();
    this.KEY_MAP = {
      "pre-key": "preKeys",
      session: "sessions",
      "sender-key": "senderKeys",
      "app-state-sync-key": "appStateSyncKeys",
      "app-state-sync-version": "appStateVersions",
      "sender-key-memory": "senderKeyMemory",
    };
  }

  debounce(func, wait) {
    if (!this._debounceTimeouts) {
      this._debounceTimeouts = new Map();
    }

    return (...args) => {
      if (this._debounceTimeouts.has(func)) {
        clearTimeout(this._debounceTimeouts.get(func));
      }

      const timeout = setTimeout(() => {
        func.apply(this, args);
        this._debounceTimeouts.delete(func);
      }, wait);
      this._debounceTimeouts.set(func, timeout);
    };
  }

  async useFileAuth() {
    const fileName = `./session.json`;

    let storedCreds = await this.fileStorage.loadFile(fileName);

    if (!storedCreds) {
      // Create a blank session file
      await this.fileStorage.saveFile(
        fileName,
        JSON.stringify({
          creds: {},
          keys: {},
        })
      );
    }

    let creds = storedCreds?.creds || initAuthCreds();
    let keys = storedCreds?.keys || {};

    const saveState = async () => {
      await this.fileStorage.saveFile(fileName, { creds, keys });
    };

    const debouncedSaveState = this.debounce(saveState, 1000);

    const clearState = async () => {
      await this.fileStorage.deleteFile(fileName);
    };

    return {
      state: {
        creds,
        keys: {
          get: (type, ids) => {
            const key = this.KEY_MAP[type];
            return ids.reduce((dict, id) => {
              const value = keys[key]?.[id];
              if (value) {
                if (type === "app-state-sync-key") {
                  dict[id] = proto.AppStateSyncKeyData.fromObject(value);
                } else {
                  dict[id] = value;
                }
              }
              return dict;
            }, {});
          },
          set: async (data) => {
            let shouldSave = false;
            for (const _key in data) {
              const key = this.KEY_MAP[_key];
              keys[key] = keys[key] || {};
              Object.assign(keys[key], data[_key]);
              shouldSave = true;
            }
            if (shouldSave) {
              debouncedSaveState();
            }
          },
        },
      },
      saveState,
      clearState,
    };
  }
}
const sessionId = "session";
const authFromFile = new AuthenticationFromFile(sessionId); // Moved to after the class definition
const switchName = sessionId;
module.exports.switchName = switchName;

// Atlas Server configuration

const startAtlas = async () => {
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

  await installPlugin();

  const { state, saveState, clearState } = await authFromFile.useFileAuth();

  let { version, isLatest } = await fetchLatestBaileysVersion();

  const Atlas = atlasConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["Atlas", "Safari", "1.0.0"],
    auth: state,
    version,
  });

  async function installPlugin() {
    console.log(chalk.yellow("Checking for Plugins...\n"));
  
    const plugins = await pluginData.find();
  
    if (!plugins.length || plugins.length == 0) {
      console.log(
        chalk.redBright("No Extra Plugins Installed ! Starting Atlas...\n")
      );
    } else {
      console.log(
        chalk.greenBright(plugins.length + " Plugins found ! Installing...\n")
      );
      for (const plugin of plugins) {
        const url = plugin.url;
        var { body, statusCode } = await got(pgUrl);
        if (statusCode == 200) {
          try {
            var folderName = "Plugins";
            var fileName = path.basename(pgUrl);
  
            var filePath = path.join(folderName, fileName);
            fs.writeFileSync(filePath, body);
          } catch (error) {
            console.log("Error:", error);
          }
        }
      }
      console.log(
        chalk.greenBright(
          "All Plugins Installed Successfully ! Starting Atlas...\n"
        )
      );
    }
  }
  
  await readcommands();

  store.bind(Atlas.ev);

  Atlas.public = true;

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

  Atlas.ev.on("group-participants.update", async (m) => {
    welcomeLeft(Atlas, m);
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
    let res;
    let data = Buffer.isBuffer(PATH)
      ? PATH
      : /^data:.*?\/.*?;base64,/i.test(PATH)
      ? Buffer.from(PATH.split`,`[1], "base64")
      : /^https?:\/\//.test(PATH)
      ? await (res = await getBuffer(PATH))
      : fs.existsSync(PATH)
      ? ((filename = PATH), fs.readFileSync(PATH))
      : typeof PATH === "string"
      ? PATH
      : Buffer.alloc(0);

    let type = (await FileType.fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    filename = path.join(
      __filename,
      "../src/" + new Date() * 1 + "." + type.ext
    );
    if (data && save) fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      size: await getSizeMedia(data),
      ...type,
      data,
    };
  };

  Atlas.setStatus = (status) => {
    Atlas.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

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

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/", express.static(join(__dirname, "Frontend")));

app.listen(PORT);
