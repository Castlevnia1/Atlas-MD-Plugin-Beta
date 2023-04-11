const fs = require("fs");
const Jimp = require("jimp");
const moment = require('moment-timezone');
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
];

module.exports = {
  name: "moderators",
  alias: [...mergedCommands],
  description: "All Moderator-related Commands",
  start: async (Atlas, m, { inputCMD, text, mods, groupName, isCreator, banData, prefix, db, doReact, args, itsMe, participants, metadata, mentionByTag, mime, isMedia, quoted, botNumber, isBotAdmin, groupAdmin, isAdmin, pushName }) => {
    const mentionedUser = m.quoted ? m.quoted.sender : mentionByTag[0];
    const userId = mentionedUser;
    
    switch (inputCMD) {
      case "addmod":
      case "setmod":
        // Only allow the creator to use this command
        if (!isCreator) return Atlas.sendMessage(m.from, { text: 'Sorry, only my *Owner* can use this command !' }, { quoted: m });

        // Check if a user is mentioned
        if (!text && !m.quoted) return Atlas.sendMessage(m.from, { text: `Please tag a user to make *mod*!` }, { quoted: m });

        

        if (!userId) return reply("Please mention a valid user to ban!");

        try {
          if (mods.includes(userId)) return Atlas.sendMessage(m.from, { text: `@${userId.split("@")[0]} is already registered to mods`, mentions: [userId] }, { quoted: m });

          // Add user to the mods list and save to the database
          mods.push(userId);
          await db.set("mods", mods);
          Atlas.sendMessage(m.from, { text: `@${userId.split("@")[0]} is successfully registered to mods`, mentions: [userId] }, { quoted: m });
        }
        catch (err) {
          console.log(err);
        }
        break;

        case "delmod":
            case "removemod":
                if (!isCreator) return Atlas.sendMessage(m.from, { text: 'Sorry, only my *Owner* can use this command !' }, { quoted: m });
      
              if (!text && !m.quoted) return Atlas.sendMessage(m.from, { text: `Please tag a user to remove from *mod*!` }, { quoted: m });
      
              if (!userId) return reply("Please mention a valid user to remove from mod!");
      
              try {
                if (!mods.includes(userId)) return Atlas.sendMessage(m.from, { text: `@${userId.split("@")[0]} is not registered as a mod`, mentions: [userId] }, { quoted: m });
      
                // Remove user from the mods list and save to the database
                const index = mods.indexOf(userId);
                mods.splice(index, 1);
                await db.set("mods", mods);
                Atlas.sendMessage(m.from, { text: `@${userId.split("@")[0]} has been successfully removed from mods`, mentions: [userId] }, { quoted: m });
              }
              catch (err) {
                console.log(err);
              }
              break;
      
              case "modlist":
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
                  break;

                  case "ban":
                    case "banuser":
                      if (!mods.includes(m.sender) && !isCreator) return Atlas.sendMessage(m.from, { text: "Sorry, only my *Devs* and *Mods* can use this command !" }, { quoted: m });
                      if (!text && !m.quoted) return Atlas.sendMessage(m.from, { text: `Please tag a user to *Ban*!` }, { quoted: m });
              

                      args.shift(); // Remove the mention from the arguments
                      let banReason = args.join(" ") || "No reason provided";

                      if (!userId) return reply("Please mention a valid user to ban!");
                      if (banData.hasOwnProperty(userId)) return Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is already *Banned* !`,
                        mentions: [mentionedUser],
                      },
                      { quoted: m }
                    );
              
                      banData[userId] = {
                        groupName,
                        reason: banReason
                      };
                      await db.set("ban", banData);
                      Atlas.sendMessage(m.from, {  text: `@${
                        mentionedUser.split("@")[0]
                      } has been *Banned* Successfully by *${pushName}*`,
                        mentions: [mentionedUser],
                      },
                      { quoted: m }
                    );
                    break;
                   
                    case "unban":
                    case "unbanuser":
                   if (!mods.includes(m.sender) && !isCreator) return Atlas.sendMessage(m.from, { text: "Sorry, only my *Devs* and *Mods* can use this command !" }, { quoted: m });
                  if (!text && !m.quoted) return Atlas.sendMessage(m.from, { text: `Please tag a user to *Unban*!` }, { quoted: m });

                  if (!userId) return reply("Please mention a valid user to unban!");
                  if (!banData.hasOwnProperty(userId)) return Atlas.sendMessage(m.from, { text: `@${mentionedUser.split("@")[0]} is not banned`, mentions: [mentionedUser], quoted: m });

                  delete banData[userId];
                  await db.set("ban", banData);
                  Atlas.sendMessage(m.from, { text: `@${
                 mentionedUser.split("@")[0]
                 } has been *Unbanned* Successfully by *${pushName}*`,
                 mentions: [mentionedUser],
                 },
               { quoted: m }
          );
         break;
         case "banlist":
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
            break;
    
          default:
            break;
        }
      },
    };
