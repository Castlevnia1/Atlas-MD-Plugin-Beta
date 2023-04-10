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
  "htag",
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
  start: async (Atlas, m, { inputCMD, text, prefix, doReact, itsMe, participants, metadata, mentionByTag, mime, isMedia, quoted, botNumber, isBotAdmin, groupAdmin, isAdmin }) => {
    let messageSender = m.sender;
    let quotedsender = m.quoted ? m.quoted.sender : mentionByTag[0];
    switch (inputCMD) {
      case "admins":
        if (!isMedia) {
          message = m.quoted ? m.quoted.msg : "『 *Attention Admins* 』";
        }
        else {
          message = "『 *Attention Admins* 』\n\n*🎀 Message:* Check this Out !";
        }
        doReact("🏅").then(() => {
          Atlas.sendMessage(
            m.from,
            { text: message, mentions: groupAdmin },
            { quoted: m }
          );
        });
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
        if (quotedsender.includes(m.sender)) return reply(`You can't demote yourself !`);
        if (quotedsender.includes(botNumber)) return reply(`Sorry, I can't demote myself !`);

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
                  text: `Sorry @${mentionedUser.split("@")[0]} Senpai, you have been *Demoted* by @${messageSender.split("@")[0]} !`,
                  mentions: [mentionedUser, messageSender],
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
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`);
        if (!isBotAdmin) return reply(`*Bot* must be *Admin* in order to use this Command!`);
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
        if (!m.isGroup) return reply(`This command can only be used in groups!`);
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
      case "htag":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`)
        if (!isMedia) {
          message2 = m.quoted ? m.quoted.msg : "『 *Attention Everybody* 』";
        }
        else {
          message2 = "『 *Attention Everybody* 』\n\n*🎀 Message:* Check this Out !";
        }

        doReact("🎌").then(() => {
          Atlas.sendMessage(
            m.from,
            { text: message2, mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        });
        break;

      case "leave":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`);
        doReact("👋");
        await Atlas.sendMessage(m.from, {
          image: { url: "https://wallpapercave.com/wp/wp9667218.png" },
          caption: `I'm Leaving this group on request... \n\nTake care everyone :)`,
          mentions: participants.map((a) => a.id),
          quoted: m,
        }).then(async () => {
          Atlas.groupLeave(m.from).catch((e) => {
            Atlas.sendMessage(m.from, { text: `An error Occurd !` }, { quoted: m });
          });
        });
        break;

      case "promote":
        if (!isAdmin) return reply(`*You* must be *Admin* in order to use this Command!`)
        if (!isBotAdmin) return reply(`*Bot* must be *Admin* in order to use this Command!`)
        if (quotedsender.includes(m.sender)) return reply(`You are already an *Admin* of this group!`);
        if (quotedsender.includes(botNumber)) return reply(`I am already an *Admin* of this group!`);

        if (!text && !m.quoted) {
          return reply(`Please tag an user to *Promote*!`);
        } else if (m.quoted) {
          mentionedUser = m.quoted.sender;
        } else {
          mentionedUser = mentionByTag[0];
        }

        userId = (await mentionedUser) || m.msg.contextInfo.participant;
        if (groupAdmin.includes(userId)) {
          return Atlas.sendMessage(
            m.from,
            {
              text: `@${mentionedUser.split("@")[0]} Senpai is already an *Admin* of this group!`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
        }
        doReact("💹");
        try {
          await Atlas.groupParticipantsUpdate(m.from, [userId], "promote").then(
            (res) =>
              Atlas.sendMessage(
                m.from,
                {
                  text: `Congratulations  @${mentionedUser.split("@")[0]} Senpai 🥳, you have been *Promoted* by @${messageSender.split("@")[0]} !`,
                  mentions: [mentionedUser, messageSender],
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
