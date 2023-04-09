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
  start: async (Atlas, m, { inputCMD, text, doReact, mime, isMedia, quoted, groupAdmin, isAdmin }) => {
    switch (inputCMD) {
      case "admins":
        doReact("🎶");
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
        doReact("🎶");

        break;

      case "delete":

        break;

      case "group":
      case "gc":

        break;

      case "groupinfo":
      case "gcinfo":

        break;

      case "hidetag":

        break;

      case "leave":

        break;

      case "promote":

        break;

      case "remove":

        break;

      case "setppgc":

        break;

      case "setgcdesc":

        break;

      case "tagall":

        break;

      default:
        break;
    }
  },
};
