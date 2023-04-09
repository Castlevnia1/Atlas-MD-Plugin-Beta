const { exec } = require("child_process");
const fs = require("fs");
const { getRandom } = require("../System/Function2.js");
let mergedCommands = [
  "admins",
  "setgcname",
  "delete",
  "demote",
  "gclink",
  "group",
  "gc",
  "groupinfo",
  "gcinfo",
  "hidetag",
  "leave",
  "promote",
  "remove",
  "setgcdesc",
  "setppgc",
  "tagall",
];

module.exports = {
  name: "audioedit",
  alias: [...mergedCommands],
  description: "All Audio Editing Commands",
  start: async (Atlas, m, { inputCMD, text, doReact, mime, isMedia, quoted, botNumber, isBotAdmin, groupAdmin, isAdmin }) => {
    switch (inputCMD) {
      case "admins":
        doReact("🏅");
        let message = "       『 *Attention Admins* 』";
        if (text && !isMedia) {
          message = text;
        } else if (!text && m.quoted) {
          message = `${m.quoted ? m.quoted.msg : ""}`;
        } else if (text && m.quoted) {
          message = text;
        } else if (text && !m.quoted) {
          message = text;
        } else {
          message = "       『 *Attention Admins* 』";
        }
        Atlas.sendMessage(
          m.from,
          { text: message, mentions: groupAdmin },
          { quoted: m }
        );
        break;

      case "setgcname":
        doReact("🎐");
        if (!isAdmin && !isBotAdmin) return reply(`*Bot* and *Command user* both must be *Admin* in order to use this Command!`);
        if (!text) return m.reply(`Please provide a new group name !\n\nExample: *${prefix}setgcname Bot Testing*`);

        let oldGCName = metadata.subject;

        try {
          ppgc = await Atlas.profilePictureUrl(m.from, "image");
        } catch {
          ppgc = botImage1;
        }

        await Atlas.groupUpdateSubject(m.from, text)
          .then((res) =>
            Atlas.sendMessage(
              m.from,
              {
                image: { url: ppgc, mimetype: "image/jpeg" },
                caption: `*『 Group Name Updated 』*\n\n_🔶 Old Name:_\n*${oldGCName}*\n\n_🔷 New Name:_\n*${text}*\n`,
              },
              { quoted: m }
            )
          )
          .catch((err) => replay(jsonformat(err)));
        break;

      case "delete":
        doReact("📛");

        //if (!isAdmin && !isBotAdmin) return reply(`*Bot* and *Command user* both must be *Admin* in order to use this Command!`);
        if (!m.quoted) return reply(`Please mention a message to delete !`);
        if (!isAdmin || !isBotAdmin) {
          if (!m.sender.includes(botNumber)) return reply(`Sorry, Without *Admin* permission, I can only delete my own messages !`);
          let { from, fromMe, id } = m.quoted;

          let key = {
            remoteJid: m.from,
            fromMe: true,
            id: m.quoted.id,
          };

          await Atlas.sendMessage(m.from, { delete: key });
        } else {
          var { from, fromMe, id } = m.quoted;

          const key = {
            remoteJid: m.from,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender,
          };

          await Atlas.sendMessage(m.from, { delete: key });
        }

        break;

      case "group":
      case "gc":
        doReact("🎀");

        break;

      case "groupinfo":
      case "gcinfo":
        doReact("⚜️");

        break;

      case "hidetag":
        doReact("🎌");

        break;

      case "leave":
        doReact("🎶");

        break;

      case "promote":
        doReact("💹");

        break;

      case "remove":
        doReact("⛔");

        break;

      case "setppgc":
        doReact("🎴");

        break;

      case "setgcdesc":
        doReact("📑");

        break;

      case "tagall":
        doReact("〽️");

        break;

      default:
        break;
    }
  },
};
