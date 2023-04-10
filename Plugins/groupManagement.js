const { exec } = require("child_process");
const fs = require("fs");
const { getRandom } = require("../System/Function2.js");
const moment = require('moment-timezone')
let mergedCommands = [
  "admins",
  "setgcname",
  "delete",
  "del",
  "demote",
  "gclink",
  "grouplink",
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
  name: "groupanagement",
  alias: [...mergedCommands],
  description: "All Audio Editing Commands",
  start: async (Atlas, m, { inputCMD, text, prefix, doReact, itsMe, metadata, mentionByTag, mime, isMedia, quoted, botNumber, isBotAdmin, groupAdmin, isAdmin }) => {
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
        if (!isAdmin && !isBotAdmin) return reply(`*You* and *Bot* both must be *Admin* in order to use this Command!`);
        if (!text) return m.reply(`Please provide a new group name !\n\nExample: *${prefix}setgcname Bot Testing*`);
        doReact("🎐");

        oldGCName = metadata.subject;

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
      case "del":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`);
        if (!m.quoted) return reply(`Please mention a message to delete !`);
        if (!isBotAdmin) {
          if (!m.quoted.sender.includes(botNumber)) return reply(`Sorry, Without *Admin* permission, I can only delete my own messages !`);
          key = {
            remoteJid: m.from,
            fromMe: true,
            id: m.quoted.id,
          };
          doReact("📛");
          await Atlas.sendMessage(m.from, { delete: key });
        } else {
          if (!isAdmin) return reply(`Sorry, only *Admins* can delete other's messages !`);
          key = {
            remoteJid: m.from,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender,
          };

          await Atlas.sendMessage(m.from, { delete: key });
        }

        break;

      case "demote":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`)
        if (!isBotAdmin) return reply(`*Bot* must be *Admin* in order to use this Command!`)
        if (m.quoted.sender.includes(m.sender)) return reply(`You can't demote yourself !`);
        if (m.quoted.sender.includes(botNumber)) return reply(`Sorry, I can't demote myself !`);

        if (!text && !m.quoted) {
          return reply(`Please tag an user to *Demote*!`);
        } else if (m.quoted) {
          mentionedUser = m.quoted.sender;
        } else {
          mentionedUser = mentionByTag[0];
        }

        userId = (await mentionedUser) || m.msg.contextInfo.participant;
        if (!groupAdmin.includes(userId)) {
          return Atlas.sendMessage(
            m.from,
            {
              text: `@${mentionedUser.split("@")[0]} Senpai is not an *Admin* of this group!`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
        }
        doReact("📉");
        try {
          await Atlas.groupParticipantsUpdate(m.from, [userId], "demote").then(
            (res) =>
              Atlas.sendMessage(
                m.from,
                {
                  text: `Sorry @${mentionedUser.split("@")[0]} Senpai, you have been *Demoted* by @${m.sender.split("@")[0]} !`,
                  mentions: [mentionedUser],
                },
                { quoted: m }
              )
          );
        } catch (error) {
          Atlas.sendMessage(
            m.from,
            {
              text: (`An error occured while trying to demote @${mentionedUser.split("@")[0]} Senpai !\n\n*Error:* ${error}`),
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
        }

        break;

      case "gclink":
      case "grouplink":
        if (!isBotAdmin) return reply(`I can't get the group link without *Admin* permission !`);
        doReact("🧩");
        let link = await Atlas.groupInviteCode(m.from);
        let linkcode = `https://chat.whatsapp.com/${link}`;

        try {
          ppgc = await Atlas.profilePictureUrl(m.from, "image");
        } catch {
          ppgc = botImage1;
        }

        try {
          await Atlas.sendMessage(
            m.from,
            {
              image: { url: ppgc, mimetype: "image/jpeg" },
              caption: `\n_🎀 Group Name:_ *${metadata.subject}*\n\n_🧩 Group Link:_\n${linkcode}\n`,
            },
            { quoted: m }
          );
        } catch (err) {
          Atlas.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
        }
        break;

      case "group":
      case "gc":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`)
        if (!isBotAdmin) return reply(`*Bot* must be *Admin* in order to use this Command!`)
        doReact("⚜️");

        if (text === "close") {
          await Atlas.groupSettingUpdate(m.from, "announcement").then((res) =>
            reply(`Group has been closed!`)
          );
        } else if (text === "open") {
          await Atlas.groupSettingUpdate(m.from, "not_announcement").then((res) =>
            reply(`Group has been opened!`)
          );
        } else {

          await Atlas.sendMessage(m.from, { image: { url: botImage2 }, caption: `\n*「 Group Message Settings 」*\n\nSelect an option below.\n\n*_Usage:_*\n\n*${prefix}group open*\n*${prefix}group close*\n`, }, { quoted: m });
        }

        break;

      case "groupinfo":
      case "gcinfo":
        doReact("🎊");
        try {
          ppgc = await Atlas.profilePictureUrl(m.from, "image");
        } catch {
          ppgc = botImage1;
        }
        participants = m.isGroup ? await metadata.participants : ''
        groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        groupOwner = m.isGroup ? metadata.owner : ''
        desc = metadata.desc ? metadata.desc : 'No Description'
        let txt = `                 *『 Group Info 』*\n\n_🎀 Group Name:_ *${metadata.subject}*\n\n_🧩 Group Description:_\n${desc}\n\n_👑 Group Owner:_ @${metadata.owner.split('@')[0]}\n_💫 Group Created on:_ *${moment(`${metadata.creation}` * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY')}*\n_📛 Total Admins:_ *${groupAdmins.length}*\n_🎈 Total Participants:_ *${metadata.participants.length}*\n`;

        await Atlas.sendMessage(
          m.from,
          {
            image: { url: ppgc, mimetype: "image/jpeg" },
            caption: txt,
            mentions: [metadata.owner]
          },
          { quoted: m }
        );
        break;

      case "hidetag":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`)
        doReact("🎌");
        let message2 = "       『 *Attention Here* 』";
        if (text && !isMedia) {
          message2 = text;
        } else if (!text && m.quoted) {
          message2 = `${m.quoted ? m.quoted.msg : ""}`;
        } else if (text && m.quoted) {
          message2 = text;
        } else if (text && !m.quoted) {
          message2 = text;
        } else {
          message2 = "       『 *Attention Here* 』";
        } 
        await Atlas.sendMessage(
          m.from,
          { text: message, mentions: participants.map((a) => a.id) },
          { quoted: m }
        );

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
