const { exec } = require("child_process");
const fs = require("fs");
const { getRandom } = require("../System/Function2.js");
let mergedCommands = [
  "blur",
  "circle",
  "jail",
  "removebg",
  "trigger",
  "triggered",
];

module.exports = {
  name: "audioedit",
  alias: [...mergedCommands],
  description: "All Image Editing Commands",
  start: async (Atlas, m, { inputCMD, text, doReact, mime, quoted }) => {
    switch (inputCMD) {
      case "bass":
       
        break;
      default:
        break;
    }
  },
};
