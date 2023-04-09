require("./Configurations");
require("./System/BotCharacters");
const { getBinaryNodeChild } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const { color } = require("./System/color.js");
const { readdirSync } = require("fs-extra");
const prefix = "/";
module.exports = async (Atlas, m, commands, chatUpdate) => {
  try {
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

    let metadata = m.isGroup ? await Atlas.groupMetadata(from) : {};
    let pushname = m.pushName || "NO name";
    let participants = m.isGroup ? metadata.participants : [sender];
    let quoted = m.quoted ? m.quoted : m;
    let groupAdmin = m.isGroup
      ? participants.filter((v) => v.admin !== null).map((v) => v.id)
      : [];
    let botNumber = await Atlas.decodeJid(Atlas.user.id);
    let isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
    let isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;
    let messSender = m.sender;
    let itsMe = messSender.includes(botNumber)? true : false;

    let isCmd = body.startsWith(prefix);
    let mime = (quoted.msg || m.msg).mimetype || " ";
    let isMedia = /image|video|sticker|audio/.test(mime);
    let budy = typeof m.text == "string" ? m.text : "";
    let args = body.trim().split(/ +/).slice(1);
    let ar = args.map((v) => v.toLowerCase());
    let text = (q = args.join(" "));
    global.suppL = "https://cutt.ly/AtlasBotSupport";
    let inputCMD = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    async function doReact(emoji){
      let reactm = {
        react: {
          text: emoji,
          key: m.key,
        },
      };
      await Atlas.sendMessage(m.from, reactm);
    };
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
    if (body.startsWith(prefix) && !icmd)
      return Atlas.sendMessage(m.from, { text: "Baka no such command" });
    if (budy.startsWith("hi"))
      return Atlas.sendMessage(m.from, { text: "Baka no such command" });

    if (m.message && isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]")),
        chalk.black(
          chalk.bgBlueBright(isGroup ? metadata.subject : m.pushName)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]")),
        chalk.black(
          chalk.bgBlueBright(m.pushName)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgBlueBright(body || type)) + "\n" + ""
      );
    };
    if (m.message && !isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ]")),
        chalk.black(chalk.bgRedBright("+"+m.from.split("@")[0])) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]")),
        chalk.black(
          chalk.bgRedBright(m.pushName)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgRedBright(body || type)) + "\n" + ""
      );
    };
    if (body.startsWith(prefix) && !icmd)
      return Atlas.sendMessage(m.from, { text: "Baka no such command" });

    // ------------------------ Character Configuration (Do not modify this part) ------------------------ //

    let char = "0"; // default one
    let CharacterSelection = "10"; // user selected character

    /*let character = await mkchar.findOne({
      id: "1",
    });
    if (character) {
      CharacterSelection = character.seletedCharacter;
    } else {
      let newCharacter = new mkchar({
        id: "1",
        seletedCharacter: "0",
      });
      await newCharacter.save();
    }

    await mkchar
      .findOne({
        id: "1",
      })
      .then(async (res) => {
        if (res.seletedCharacter != char) {
          CharacterSelection = res.seletedCharacter;
        } else {
          CharacterSelection = char;
        }
      });*/

    let idConfig = "charID" + CharacterSelection;

    global.botName = global[idConfig].botName;
    global.botVideo = global[idConfig].botVideo;
    global.botImage1 = global[idConfig].botImage1;
    global.botImage2 = global[idConfig].botImage2;
    global.botImage3 = global[idConfig].botImage3;
    global.botImage4 = global[idConfig].botImage4;
    global.botImage5 = global[idConfig].botImage5;
    global.botImage6 = global[idConfig].botImage6;



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
      quoted,
      mentionByTag,
      mime,
      isBotAdmin,
      prefix,
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
