const {
  banUser,
  checkBan,
  unbanUser,
  setMod,
  removeMod,
  checkMod,
  fetchMods,
  fetchBannedUsers
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
        } else {
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is already *Banned*`, mentions: [mentionedUser] }, { quoted: m });
        }
        break;

      case "unban":
      case "unbanuser":
        if (await checkBan(userId)) {
          await unbanUser(userId);
          await Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} has been *Un-Banned* Successfully by *${pushName}*`, mentions: [mentionedUser] }, { quoted: m });
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
