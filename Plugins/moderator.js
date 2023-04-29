const {
<<<<<<< Updated upstream
  banUser,
  checkBan,
  unbanUser,
  setMod,
  removeMod,
  checkMod,
  fetchMods,
  fetchBannedUsers
=======
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
>>>>>>> Stashed changes
} = require("../System/SiliconDB/siliconDB-config");

let mergedCommands = ["addmod", "setmod", "delmod", "removemod", "modlist", "mods", "ban", "banuser", "unban", "unbanuser", "banlist", "listbans"];

module.exports = {
  name: "moderators",
  alias: [...mergedCommands],
  description: "All Moderator-related Commands",
  start: async (Atlas, m, { inputCMD, text, modcheck, isCreator, mentionByTag, quoted, pushName }) => {
    if (!modcheck && !isCreator) return reply(`*Only mods can use this command!*`);
    const mentionedUser = m.quoted ? m.quoted.sender : mentionByTag[0];
    const userId = mentionedUser;

    switch (inputCMD) {
      case "addmod":
      case "setmod":
<<<<<<< Updated upstream
        if (!(await checkMod(userId))) {
          await setMod(userId);
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} has been promoted to *Mod* by *${pushName}*`, mentions: [mentionedUser] }, { quoted: m });
        } else {
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is already a *Mod*`, mentions: [mentionedUser] }, { quoted: m });
        }
        break;

      case "removemod":
      case "delmod":
        if (await checkMod(userId)) {
          await removeMod(userId);
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} has been demoted from *Mod* by *${pushName}*`, mentions: [mentionedUser] }, { quoted: m });
        } else {
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is not a *Mod*`, mentions: [mentionedUser] }, { quoted: m });
        }
        break;

      case "modlist":
      case "mods":
        const mods = await fetchMods();
        let modListText = mods.length === 0 ? "There are no moderators registered currently." : "*List of Moderators:*\n\n" + mods.map(mod => `@${mod.split("@")[0]}`).join('\n');
        Atlas.sendMessage(m.from, { text: modListText, mentions: mods }, { quoted: m });
        break;

      case "ban":
      case "banuser":
        if (!text && !m.quoted) return;
        if (!(await checkBan(userId))) {
          await banUser(userId);
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} has been *Banned* Successfully by *${pushName}*`, mentions: [mentionedUser] }, { quoted: m });
=======
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
        if (!userId) return reply("Please mention a valid user to ban!");

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
        if (!userId) return reply("Please mention a valid user to ban!");

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
        if (!text && !m.quoted)
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user to *Ban*!` },
            { quoted: m }
          );
        chechBanStatus = await checkBan(userId);
        if (chechBanStatus) {
          return Atlas.sendMessage(m.from, {
            text: `@${mentionedUser.split("@")[0]} is already *Banned* !`,
            mentions: [mentionedUser],
            quoted: m,
          });
>>>>>>> Stashed changes
        } else {
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is already *Banned*`, mentions: [mentionedUser] }, { quoted: m });
        }
        break;

      case "unban":
      case "unbanuser":
<<<<<<< Updated upstream
        if (await checkBan(userId)) {
          await unbanUser(userId);
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} has been *Un-Banned* Successfully by *${pushName}*`, mentions: [mentionedUser] }, { quoted: m });
=======
        if (!text && !m.quoted)
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag a user to *Un-Ban*!` },
            { quoted: m }
          );
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
>>>>>>> Stashed changes
        } else {
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is not *Banned*`, mentions: [mentionedUser] }, { quoted: m });
        }
        break;
        case "banlist":
        const bannedUsers = await fetchBannedUsers();
        let banListText = bannedUsers.length === 0 ? "There are no banned users currently." : "*List of Banned Users:*\n\n" + bannedUsers.map(user => `@${user.split("@")[0]}`).join('\n');
        Atlas.sendMessage(m.from, { text: banListText, mentions: bannedUsers }, { quoted: m });
        break;

      default:
        break;
    }
  },
};
