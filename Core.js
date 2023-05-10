require("./Configurations");
require("./System/BotCharacters");
const { getBinaryNodeChild } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const { color } = require("./System/color.js");
const { readdirSync } = require("fs-extra");
const prefix = global.prefa;
//const { QuickDB, MongoDriver } = require("quick.db");
const { QuickDB, JSONDriver } = require("quick.db");
global.Levels = require("discord-xp");
module.exports = async (Atlas, m, commands, chatUpdate) => {
  try {
    /*const mongoDriver = new MongoDriver(
      //"mongodb+srv://fantox001:fantox001@cluster0.ypvhtia.mongodb.net/?retryWrites=true&w=majority"
      "mongodb+srv://tuff:tuff@cluster0.fhsvdnc.mongodb.net/test"
    );
    await mongoDriver.connect();
    const db = new QuickDB({ driver: mongoDriver });*/
    const jsonDriver = new JSONDriver();
    const db = new QuickDB({ driver: jsonDriver });

    //Levels.setURL(mongodb);
    let { type, isGroup, sender, from } = m;
    let body =
      type == "buttonsResponseMessage"
        ? m.message[type].selectedButtonId
        : type == "listResponseMessage"
        ? m.message[type].singleSelectReply.selectedRowId
        : type == "templateButtonReplyMessage"
        ? m.message[type].selectedId
        : m.text;
    let response =
      type === "conversation" && body?.startsWith(prefix)
        ? body
        : (type === "imageMessage" || type === "videoMessage") &&
          body &&
          body?.startsWith(prefix)
        ? body
        : type === "extendedTextMessage" && body?.startsWith(prefix)
        ? body
        : type === "buttonsResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "listResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "templateButtonReplyMessage" && body?.startsWith(prefix)
        ? body
        : "";

    const metadata = m.isGroup ? await Atlas.groupMetadata(from) : {};
    const pushname = m.pushName || "NO name";
    const participants = m.isGroup ? metadata.participants : [sender];
    const quoted = m.quoted ? m.quoted : m;
    const groupAdmin = m.isGroup
      ? participants.filter((v) => v.admin !== null).map((v) => v.id)
      : [];
    const botNumber = await Atlas.decodeJid(Atlas.user.id);
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;
    const messSender = m.sender;
    const itsMe = messSender.includes(botNumber) ? true : false;

    const isCmd = body.startsWith(prefix);
    const mime = (quoted.msg || m.msg).mimetype || " ";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const budy = typeof m.text == "string" ? m.text : "";
    const args = body.trim().split(/ +/).slice(1);
    const ar = args.map((v) => v.toLowerCase());
    const text = (q = args.join(" "));
    global.suppL = "https://cutt.ly/AtlasBotSupport";
    const inputCMD = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const {
      checkBan,
      checkMod,
      getChar,
      checkPmChatbot,
      getBotMode,
      checkBanGroup,
      checkAntilink,
      checkGroupChatbot,
    } = require("./System/SiliconDB/siliconDB-config");
    async function doReact(emoji) {
      let reactm = {
        react: {
          text: emoji,
          key: m.key,
        },
      };
      await Atlas.sendMessage(m.from, reactm);
    }
    const cmdName = response
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const cmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      ) ||
      "";
    const icmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      );
    const mentionByTag =
      type == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];

    if (body == prefix) {
      await doReact("❌");
      return m.reply(
        `Bot is active, type *${prefix}help* to see the list of commands.`
      );
    }
    if (body.startsWith(prefix) && !icmd) {
      await doReact("❌");
      return m.reply(
        `*${budy.replace(
          prefix,
          ""
        )}* - Command not found or plug-in not installed !\n\nIf you want to see the list of commands, type:    *_${prefix}help_*\n\nOr type:  *_${prefix}pluginlist_* to see installable plug-in list.`
      );
    }

    if (m.message && isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]")),
        chalk.black(
          chalk.bgBlueBright(isGroup ? metadata.subject : m.pushName)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]")),
        chalk.black(chalk.bgBlueBright(m.pushName)) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgBlueBright(body || type)) + "\n" + ""
      );
    }
    if (m.message && !isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ]")),
        chalk.black(chalk.bgRedBright("+" + m.from.split("@")[0])) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]")),
        chalk.black(chalk.bgRedBright(m.pushName)) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgRedBright(body || type)) + "\n" + ""
      );
    }
    if (body.startsWith(prefix) && !icmd)
      return Atlas.sendMessage(m.from, { text: "Baka no such command" });

    // ----------------------------- System Configuration (Do not modify this part) ---------------------------- //

    const isbannedUser = await checkBan(m.sender);
    const modcheck = await checkMod(m.sender);
    const isBannedGroup = await checkBanGroup(m.from);
    const isAntilinkOn = await checkAntilink(m.from);
    const isPmChatbotOn = await checkPmChatbot();
    const isGroupChatbotOn = await checkGroupChatbot(m.from);
    const botWorkMode = await getBotMode();

    if (isCmd || icmd) {
      if (isbannedUser) {
        return Atlas.sendMessage(
          m.from,
          {
            text: `You are banned from using commands !`,
          },
          { quoted: m }
        );
      }
    }

    if (isAntilinkOn && m.isGroup && !isAdmin && !isCreator && isBotAdmin) {
      const linkgce = await Atlas.groupInviteCode(from);
      if (budy.includes(`https://chat.whatsapp.com/${linkgce}`)) {
        return;
      } else if (budy.includes(`https://chat.whatsapp`)) {
        const bvl = `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Group link detected !*\n\n*🚫 You are not allowed to send group links in this group !*\n`;
        await Atlas.sendMessage(
          from,
          {
            delete: {
              remoteJid: m.from,
              fromMe: false,
              id: m.id,
              participant: m.sender,
            },
          },
          {
            quoted: m,
          }
        );
        return m.reply(bvl);
      }
    }

    // ------------------------ Character Configuration (Do not modify this part) ------------------------ //

    let char = "0"; // default one
    CharacterSelection = "0"; // user selected character

    try {
      let charx = await getChar();
      CharacterSelection = charx;
    } catch (e) {
      CharacterSelection = "0";
    }

    if (CharacterSelection == char) {
      CharacterSelection = "0";
    } else {
      CharacterSelection = CharacterSelection;
    }

    let idConfig = "charID" + CharacterSelection;

    global.botName = global[idConfig].botName;
    global.botVideo = global[idConfig].botVideo;
    global.botImage1 = global[idConfig].botImage1;
    global.botImage2 = global[idConfig].botImage2;
    global.botImage3 = global[idConfig].botImage3;
    global.botImage4 = global[idConfig].botImage4;
    global.botImage5 = global[idConfig].botImage5;
    global.botImage6 = global[idConfig].botImage6;

    const pad = (s) => (s < 10 ? "0" : "") + s;
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      const secs = Math.floor(seconds % 60);
      return (time = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`);
    };
    const uptime = () => formatTime(process.uptime());

    let upTxt = `〘  ${botName} Personal Edition  〙    ⚡ Uptime: ${uptime()}`;
    Atlas.setStatus(upTxt);

    cmd.start(Atlas, m, {
      name: "Atlas",
      metadata,
      pushName: pushname,
      participants,
      body,
      inputCMD,
      args,
      botNumber,
      isCmd,
      isMedia,
      ar,
      isAdmin,
      groupAdmin,
      text,
      itsMe,
      doReact,
      modcheck,
      isCreator,
      quoted,
      mentionByTag,
      mime,
      isBotAdmin,
      prefix,
      db,
      command: cmd.name,
      commands,
      toUpper: function toUpper(query) {
        return query.replace(/^\w/, (c) => c.toUpperCase());
      },
    });
  } catch (e) {
    e = String(e);
    if (!e.includes("cmd.start")) console.error(e);
  }
};
