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
  start: async (Atlas, m, { inputCMD, text, doReact, mime, quoted }) => {
    if (!/audio/.test(mime)) {
      doReact("❌").then(() => {
        return reply(`Please mention an audio file !`);
      });
      return;
    }
    switch (inputCMD) {
      case "bass":
        doReact("🎶");
        
        break;

      case "nightcore":
        doReact("🎶");
       
        break;

      case "deep":
        
        break;

      case "reverse":
        
        break;

      case "robot":
        
        break;

      case "slow":
        
        break;

      case "smooth":
        
        break;

      case "tempo":
        
        break;
      default:
        break;
    }
  },
};
