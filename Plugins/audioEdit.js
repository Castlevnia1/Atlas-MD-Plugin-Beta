const { exec } = require("child_process");
const fs = require("fs");
const { getRandom } = require("../System/Function2.js");
let mergedCommands = [
  "bass",
  "bassboost",
];

module.exports = {
  name:"audioedit",
  alias: [...mergedCommands],
  description: "All Audio Editing Commands",
  start: async (Atlas, m, { inputCMD, text, doReact,mime,quoted}) => {
    if (!/audio/.test(mime)) {doReact("❌").then(() => {
        return reply(`Please mentuoin a audio file !`);
      });
      return;
    }
    switch (inputCMD) {
        case "bass":
        case "bassboost":
    doReact("🎶");
    let media = await Atlas.downloadAndSaveMediaMessage(quoted);
    let set = "-af equalizer=f=18:width_type=o:width=2:g=14";
    let ran = getRandom(".mp3");
    try {
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
          fs.unlinkSync(media);
          if (err) return m.reply("An error Occurd !");
          let buff = fs.readFileSync(ran);
          Atlas.sendMessage(
            m.from,
            { audio: buff, mimetype: "audio/mpeg" },
            { quoted: m }
          );
          fs.unlinkSync(ran);
        });
      } catch (e) {
        doReact("❌")
        reply("An error Occurd ! Please mention an Audio!");
      }
      break;

      default:
        break;
    }
  }
};
