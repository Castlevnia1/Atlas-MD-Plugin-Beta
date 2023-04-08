/*const { getBinaryNodeChild } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const { color } = require("../System/color.js");
const { readdirSync } = require("fs-extra");
const prefix = "/";
module.exports = async (client, m, commands, chatUpdate) => {
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

    let metadata = isGroup ? await client.groupMetadata(from) : {};
    let pushname = m.pushName || "NO name";
    let participants = isGroup ? metadata.participants : [sender];
    let groupAdmin = isGroup
      ? participants.filter((v) => v.admin !== null).map((v) => v.id)
      : [];
    let isBotAdmin = isGroup ? groupAdmin.includes(client.user?.jid) : false;
    let isAdmin = isGroup ? groupAdmin.includes(sender) : false;

    let quoted = m.quoted ? m.quoted : m;
    let mime = (quoted.msg || m.msg).mimetype || " ";
    let isMedia = /image|video|sticker|audio/.test(mime);
    let budy = typeof m.text == "string" ? m.text : "";
    let args = body.trim().split(/ +/).slice(1);
    let ar = args.map((v) => v.toLowerCase());
    let text = (q = args.join(" "));
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
      return client.sendMessage(m.from, { text: "Baka no such command" });
    if (budy.startsWith("hi"))
      return client.sendMessage(m.from, { text: "Baka no such command" });

    if (m.message && isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]")),
        chalk.black(
          chalk.bgBlueBright(isGroup ? metadata.subject : m.pushName)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ TIME ]")),
        chalk.black(chalk.bgBlueBright(new Date())) +
          "\n" +
          chalk.black(chalk.bgWhite("[ FROM ]")),
        chalk.black(
          chalk.bgBlueBright(m.pushName + " @" + m.sender.split("@")[0])
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ BODY ]")),
        chalk.black(chalk.bgBlueBright(body || type)) + "\n" + ""
      );
    }
    if (m.message && !isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ PRIV ]")),
        chalk.black(chalk.bgRedBright("PRIVATE CHATT")) +
          "\n" +
          chalk.black(chalk.bgWhite("[ TIME ]")),
        chalk.black(chalk.bgRedBright(new Date())) +
          "\n" +
          chalk.black(chalk.bgWhite("[ FROM ]")),
        chalk.black(
          chalk.bgRedBright(m.pushName + " @" + m.sender.split("@")[0])
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ BODY ]")),
        chalk.black(chalk.bgRedBright(body || type)) + "\n" + ""
      );
    }
    if (body.startsWith(prefix) && !icmd)
      return client.sendMessage(m.from, { text: "Baka no such command" });

    cmd.start(client, m, {
      name: "client",
      metadata,
      pushName: pushname,
      participants,
      body,
      args,
      isAdmin,
      groupAdmin,
      text,
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
*/