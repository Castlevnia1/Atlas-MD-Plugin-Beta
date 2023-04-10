const fs = require("fs");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { getRandom } = require("../System/Function2.js");
const Jimp = require("jimp");
const moment = require('moment-timezone')
let mergedCommands = [
  "sticker",
  "s",
  "steal",
  "take",
  "stickercrop",
  "scrop",
  "smeme",
  "stickermeme",
  "quote",
  "q",
];

module.exports = {
  name: "stickerformat",
  alias: [...mergedCommands],
  description: "All Sticker formatting Commands",
  start: async (Atlas, m, { inputCMD, text, prefix, doReact, args, itsMe, participants, metadata, mentionByTag, mime, isMedia, quoted, botNumber, isBotAdmin, groupAdmin, isAdmin }) => {
    switch (inputCMD) {
        case "s": case "sticker":
            break;

            case "steal": case "take":
            break;

            case "scrop": case "stickercrop":
            break;

            case "smeme": case "stickermeme":
            break;

            case "q": case "quote":
            break;

      default:
        break;
    }
  },
};
