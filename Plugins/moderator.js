const fs = require("fs");
const Jimp = require("jimp");
const moment = require("moment-timezone");
const {
  banUser, //----------------------- BAN
  checkBan, // --------------------- CHECK BAN STATUS
  unbanUser, // -------------------- UNBAN
  addMod, // ----------------------- ADD MOD
  checkMod, // --------------------- CHECK MOD STATUS
  delMod, // ----------------------- DEL MOD
  setChar, // ---------------------- SET CHAR ID
  getChar, // ---------------------- GET CHAR ID
  activateChatBot, // -------------- ACTIVATE PM CHATBOT
  checkPmChatbot, // --------------- CHECK PM CHATBOT STATUS
  deactivateChatBot,
} = require("../System/SiliconDB/siliconDB-config");

let mergedCommands = [
  "addmod",
  "setmod",
  "delmod",
  "removemod",
  "modlist",
  "mods",
  "ban",
  "banuser",
  "unban",
  "unbanuser",
  "banlist",
  "listbans",
  "setchar",
];

module.exports = {
  name: "moderators",
  alias: [...mergedCommands],
  uniquecommands:[ "addmod", "delmod", "mods", "ban", "unban", "banlist", "setchar"],
  description: "All Moderator-related Commands",
  start: async (
    Atlas,
    m,
    {
      inputCMD,
      text,
      mods,
      groupName,
      isCreator,
      banData,
      prefix,
      db,
      doReact,
      args,
      itsMe,
      participants,
      metadata,
      mentionByTag,
      mime,
      isMedia,
      quoted,
      botNumber,
      isBotAdmin,
      groupAdmin,
      isAdmin,
      pushName,
    }
  ) => {
    const mentionedUser = m.quoted ? m.quoted.sender : mentionByTag[0];
    const userId = mentionedUser;

    switch (inputCMD) {
      case "addmod":
      case "setmod":
        // Only allow the creator to use this command
        if (!isCreator)
          return Atlas.sendMessage(
            m.from,
            {
              text: "Sorry, only my *Owner* can use this command ! *Added Mods* does not has this permission.",
            },
            { quoted: m }
          );

        // Check if a user is mentioned
        if (!text && !m.quoted)
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user to make *mod*!` },
            { quoted: m }
          );
        if (!userId) return m.reply("Please mention a valid user to ban!");

        try {
          const isUsermod = await checkMod(userId);
          if (isUsermod)
            return Atlas.sendMessage(
              m.from,
              {
                text: `@${userId.split("@")[0]} is already registered as a mod`,
                mentions: [userId],
              },
              { quoted: m }
            );

          // Add user to the mods list and save to the database
          await addMod(userId)
            .then(() => {
              Atlas.sendMessage(
                m.from,
                {
                  text: `@${
                    userId.split("@")[0]
                  } is successfully registered to mods`,
                  mentions: [userId],
                },
                { quoted: m }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
        break;

      case "delmod":
      case "removemod":
        // Only allow the creator to use this command
        if (!isCreator)
          return Atlas.sendMessage(
            m.from,
            {
              text: "Sorry, only my *Owner* can use this command ! *Added Mods* does not has this permission.",
            },
            { quoted: m }
          );

        // Check if a user is mentioned
        if (!text && !m.quoted)
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user to make *mod*!` },
            { quoted: m }
          );
        if (!userId) return m.reply("Please mention a valid user to ban!");

        try {
          const isUsermod = await checkMod(userId);
          if (!isUsermod)
            return Atlas.sendMessage(
              m.from,
              {
                text: `@${userId.split("@")[0]} is not registered as a mod !`,
                mentions: [userId],
              },
              { quoted: m }
            );

          await delMod(userId)
            .then(() => {
              Atlas.sendMessage(
                m.from,
                {
                  text: `@${
                    userId.split("@")[0]
                  } is successfully removed to mods`,
                  mentions: [userId],
                },
                { quoted: m }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
        break;

      /*case "modlist":
                case "mods":
                  try {
          
                    if (mods.length === 0) {
                      return Atlas.sendMessage(m.from, { text: "There are no moderators registered currently." }, { quoted: m });
                    }
          
                    let modListText = "*List of Moderators:*\n\n";
                    for (const mod of mods) {
                      modListText += `@${mod.split("@")[0]}\n`;
                    }
          
                    Atlas.sendMessage(m.from, { text: modListText, mentions: mods }, { quoted: m });
                  } catch (err) {
                    console.log(err);
                  }
                  break;*/

      case "ban":
      case "banuser":
        if (!text && !m.quoted) {
          await doReact("❌");
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user to *Ban*!` },
            { quoted: m }
          );
        }
        chechSenderModStatus = await checkMod(m.sender);
        if (!chechSenderModStatus && !isCreator) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, {
            text: `Sorry, only *Owners* and *Mods* can use this command !`,
            quoted: m,
          });
        }
        chechBanStatus = await checkBan(userId);
        checkUserModStatus = await checkMod(userId);
        if (checkUserModStatus || isCreator) {
          return Atlas.sendMessage(m.from, {
            text: `Sorry, I can't ban an *Owner* or *Mod* !`,
            quoted: m,
          });
        }
        if (chechBanStatus) {
          return Atlas.sendMessage(m.from, {
            text: `@${mentionedUser.split("@")[0]} is already *Banned* !`,
            mentions: [mentionedUser],
            quoted: m,
          });
        } else {
          banUser(userId).then(async () => {
            await Atlas.sendMessage(
              m.from,
              {
                text: `@${
                  mentionedUser.split("@")[0]
                } has been *Banned* Successfully by *${pushName}*`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          });
        }

        break;

      case "unban":
      case "unbanuser":
        if (!text && !m.quoted) {
          await doReact("❌");
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user to *Un-Ban*!` },
            { quoted: m }
          );
        }
        chechSenderModStatus = await checkMod(m.sender);
        if (!chechSenderModStatus && !isCreator) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, {
            text: `Sorry, only *Owners* and *Mods* can use this command !`,
            quoted: m,
          });
        }
        chechBanStatus = await checkBan(userId);
        if (chechBanStatus) {
          unbanUser(userId).then(async () => {
            await Atlas.sendMessage(
              m.from,
              {
                text: `@${
                  mentionedUser.split("@")[0]
                } has been *Un-Banned* Successfully by *${pushName}*`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          });
        } else {
          return Atlas.sendMessage(m.from, {
            text: `@${mentionedUser.split("@")[0]} is not *Banned* !`,
            mentions: [mentionedUser],
            quoted: m,
          });
        }
        break;
      /*case "banlist":
          case "listbans":
            try {
              if (Object.keys(banData).length === 0) {
                return Atlas.sendMessage(m.from, { text: "There are no banned users currently." }, { quoted: m });
              }
    
              let banListText = "*List of Banned Users:*\n\n";
              for (const userId in banData) {
                banListText += `\n╭─────────────◆\n│ *⚜️ User:-*@${userId.split("@")[0]}\n│ *👥 Group:* ${banData[userId].groupName}\n│ *❗ Reason:* ${banData[userId].reason}\n╰─────────────◆\n\n`;
              }
    
              Atlas.sendMessage(m.from, { text: banListText, mentions: Object.keys(banData) }, { quoted: m });
            } catch (err) {
              console.log(err);
            }
            break;*/

      case "setchar":
        if (!text) {
          await doReact("❌");
          return Atlas.sendMessage(
            m.from,
            { text: `Please enter a character number between 0-19 to set !` },
            { quoted: m }
          );
        }
        chechSenderModStatus = await checkMod(m.sender);
        if (!chechSenderModStatus && !isCreator) {
          await doReact("❌");
          return Atlas.sendMessage(m.from, {
            text: `Sorry, only *Owners* and *Mods* can use this command !`,
            quoted: m,
          });
        }

        const intinput = parseInt(text);
        if (intinput < 0 || intinput > 19) {
          await doReact("❌");
          return Atlas.sendMessage(
            m.from,
            { text: `Please enter a character number between 0-19 to set !` },
            { quoted: m }
          );
        }
        const botNames = [
          "Atlas MD",
          "Power",
          "Makima",
          "Denji",
          "Zero Two",
          "Chika",
          "Miku",
          "Marin",
          "Ayanokoji",
          "Ruka",
          "Mizuhara",
          "Rem",
          "Sumi",
          "Kaguya",
          "Yumeko",
          "Kurumi",
          "Mai",
          "Yor",
          "Shinbou",
          "Eiko",
        ];
        const botLogos = [
          "https://wallpapercave.com/wp/wp5924545.jpg",
          "https://wallpapercave.com/wp/wp11253614.jpg",
          "https://images5.alphacoders.com/126/1264439.jpg",
          "https://i0.wp.com/metagalaxia.com.br/wp-content/uploads/2022/11/Chainsaw-Man-Denji-e-Power.webp?resize=1068%2C601&ssl=1",
          "https://images3.alphacoders.com/949/949253.jpg",
          "https://images4.alphacoders.com/100/1002134.png",
          "https://wallpapercave.com/wp/wp10524580.jpg",
          "https://images2.alphacoders.com/125/1257915.jpg",
          "https://wallpapers.com/images/file/kiyotaka-ayanokoji-in-pink-qs33qgqm79ccsq7n.jpg",
          "https://wallpapercave.com/wp/wp8228630.jpg",
          "https://images3.alphacoders.com/128/1288059.png",
          "https://images.alphacoders.com/711/711900.png",
          "https://moewalls.com/wp-content/uploads/2022/07/sumi-sakurasawa-hmph-rent-a-girlfriend-thumb.jpg",
          "https://wallpapercave.com/wp/wp6099650.png",
          "https://wallpapercave.com/wp/wp5017991.jpg",
          "https://wallpapercave.com/wp/wp2535489.jpg",
          "https://images4.alphacoders.com/972/972790.jpg",
          "https://images7.alphacoders.com/123/1236729.jpg",
          "https://wallpapercave.com/wp/wp4650481.jpg",
          "https://images8.alphacoders.com/122/1229829.jpg",
        ];

        checkChar = await getChar();
        if (checkChar === intinput) {
          return Atlas.sendMessage(
            m.from,
            {
              image: { url: botLogos[intinput] },
              caption: `Character number *${intinput}* - *${botNames[intinput]}* is already default !`,
            },
            { quoted: m }
          );
        }

        setChar(intinput).then(async () => {
          await Atlas.sendMessage(
            m.from,
            {
              image: { url: botLogos[intinput] },
              caption: `Character number *${intinput}* - *${botNames[intinput]}* has been set Successfully by *${pushName}*`,
            },
            { quoted: m }
          );
        });

        break;

      default:
        break;
    }
  },
};
