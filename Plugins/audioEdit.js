const { exec } = require("child_process");
const fs = require("fs");
const { getRandom } = require("../System/Function2.js");
let mergedCommands = [
  "bass",
  "deep",
  "nightcore",
  "reverse",
  "robot",
  "slow",
  "smooth",
  "tempo",
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
        let media = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set = "-af equalizer=f=18:width_type=o:width=2:g=14";
        let ran = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "nightcore":
        doReact("🎶");
        let media3 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set3 = "-filter:a atempo=1.07,asetrate=44100*1.20";
        let ran3 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media3} ${set3} ${ran3}`, (err, stderr, stdout) => {
            fs.unlinkSync(media3);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran3);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran3);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "deep":
        doReact("🎶");
        let media2 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set2 = "-af atempo=4/4,asetrate=44500*2/3";
        let ran2 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media2} ${set2} ${ran2}`, (err, stderr, stdout) => {
            fs.unlinkSync(media2);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran2);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran2);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "reverse":
        doReact("🎶");
        let media4 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set4 = '-filter_complex "areverse"';
        let ran4 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media4} ${set4} ${ran4}`, (err, stderr, stdout) => {
            fs.unlinkSync(media4);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran4);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran4);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "robot":
        doReact("🎶");
        let media5 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set5 =
          "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
        let ran5 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media5} ${set5} ${ran5}`, (err, stderr, stdout) => {
            fs.unlinkSync(media5);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran5);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran5);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "slow":
        doReact("🎶");
        let media6 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set6 = '-filter:a "atempo=0.8,asetrate=44100"';
        let ran6 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media6} ${set6} ${ran6}`, (err, stderr, stdout) => {
            fs.unlinkSync(media6);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran6);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran6);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "smooth":
        doReact("🎶");
        let media7 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set7 =
          "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
        let ran7 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media7} ${set7} ${ran7}`, (err, stderr, stdout) => {
            fs.unlinkSync(media7);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran7);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran7);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;

      case "tempo":
        doReact("🎶");
        let media8 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let set8 = '-filter:a "atempo=0.9,asetrate=65100"';
        let ran8 = getRandom(".mp3");
        try {
          exec(`ffmpeg -i ${media8} ${set8} ${ran8}`, (err, stderr, stdout) => {
            fs.unlinkSync(media8);
            if (err) return reply("An error Occurd !");
            let buff = fs.readFileSync(ran8);
            Atlas.sendMessage(
              m.from,
              { audio: buff, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            fs.unlinkSync(ran8);
          });
        } catch (e) {
          doReact("❌");
          reply("An error Occurd ! Please mention an Audio!");
        }
        break;
      default:
        break;
    }
  },
};
