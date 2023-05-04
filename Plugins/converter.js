const { getRandom } = require("../System/Function");
const { webp2mp4File } = require("../System/Uploader");
const { toAudio } = require("../System/File-Converter");
const { exec } = require("child_process");
const fs = require("fs");
let { GraphOrg } = require("../System/Uploader");

const util = require("util");
let mergedCommands = [
  "toimg",
  "toimage",
  "togif",
  "tomp4",
  "tomp3",
  "toaudio",
  "tourl",
];

module.exports = {
  name: "converters",
  alias: [...mergedCommands],
  description: "All converter related commands",
  start: async (
    Atlas,
    m,
    { inputCMD, text, quoted, doReact, prefix, mime }
  ) => {
    switch (inputCMD) {
      case "toimg":
      case "toimage":
        if (!m.quoted && !/webp/.test(mime)) {
          await doReact("❔");
          return reply(
            `Please reply to a *Non-animated* sticker to convert it to image`
          );
        }
        await doReact("🎴");
        let mediaMess = await Atlas.downloadAndSaveMediaMessage(quoted);
        let ran = await getRandom(".png");
        exec(`ffmpeg -i ${mediaMess} ${ran}`, (err) => {
          fs.unlinkSync(mediaMess);
          if (err) {
            Atlas.sendMessage(
              m.from,
              {
                text: `Please mention a *Non-animated* sticker to process ! \n\nOr use *${prefix}togif* / *${prefix}tomp4*  to process *Animated* sticker !`,
              },
              { quoted: m }
            );
            return;
          }
          let buffer = fs.readFileSync(ran);
          Atlas.sendMessage(
            m.from,
            { image: buffer, caption: `_Converted by:_  *${botName}*\n` },
            { quoted: m }
          );
          fs.unlinkSync(ran);
        });
        break;

      case "tomp4":
        if (!m.quoted && !/webp/.test(mime)) {
          await doReact("❔");
          return reply(
            `Please reply to an *Animated* sticker to convert it to video !`
          );
        }
        await doReact("🎴");
        let mediaMess2 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let webpToMp4 = await webp2mp4File(mediaMess2);

        await Atlas.sendMessage(
          m.from,
          {
            video: { url: webpToMp4.result },
            caption: `_Converted by:_  *${botName}*\n`,
          },
          { quoted: m }
        );
        fs.unlinkSync(mediaMess2);
        break;

      case "togif":
        if (!m.quoted && !/webp/.test(mime)) {
          await doReact("❔");
          return reply(
            `Please reply to an *Animated* sticker to convert it to gif !`
          );
        }
        await doReact("🎴");
        let mediaMess3 = await Atlas.downloadAndSaveMediaMessage(quoted);
        let webpToMp42 = await webp2mp4File(mediaMess3);

        await Atlas.sendMessage(
          m.from,
          {
            video: { url: webpToMp42.result },
            caption: `_Converted by:_  *${botName}*\n`,
            gifPlayback: true,
          },
          { quoted: m }
        );
        fs.unlinkSync(mediaMess3);

        break;

      case "tomp3":
        if (/document/.test(mime)) {
          await doReact("❌");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!/video/.test(mime) && !/audio/.test(mime)) {
          await doReact("❌");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!m.quoted) {
          await doReact("❔");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix}tomp3`
          );
        }
        await doReact("🎶");
        let media = await quoted.download();
        let audio = await toAudio(media, "mp4");
        Atlas.sendMessage(
          m.from,
          {
            document: audio,
            mimetype: "audio/mpeg",
            fileName: `Converted By ${botName} ${m.id}.mp3`,
          },
          { quoted: m }
        );

        break;

      case "toaudio":
        if (/document/.test(mime)) {
          await doReact("❌");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!/video/.test(mime) && !/audio/.test(mime)) {
          await doReact("❌");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!m.quoted) {
          await doReact("❔");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix}tomp3`
          );
        }
        await doReact("🎶");
        let media2 = await quoted.download();
        let audio2 = await toAudio(media2, "mp4");
        Atlas.sendMessage(
          m.from,
          { audio: audio2, mimetype: "audio/mpeg" },
          { quoted: m }
        );
        break;

      case "tourl":
        if (!m.quoted) {
            await doReact("❔");
            return reply(
              `Plese provide an *Image* / *Video* to generate a link! With Caption ${prefix}tourl`
            );
          }
        let media5 = await Atlas.downloadAndSaveMediaMessage(quoted);
        if (/image/.test(mime)) {
          await doReact("🔗");
          let anu = await GraphOrg(media5);
          reply(`*Generated Image URL:* \n\n${util.format(anu)}\n`);
        } else if (/video/.test(mime)) {
          await doReact("▶️");
          try {
            let anu = await GraphOrg(media5);
            reply(`*Generated Video URL:* \n\n${util.format(anu)}\n`);
          } catch (e) {
            await doReact("❌");
            await fs.unlinkSync(media5);
            return Atlas.sendMessage(
                m.from,
                { text: `*Your video size is too big!*\n\n*Max video size:* 5MB` },
                { quoted: m }
              );
          }
        } else {
          await doReact("❌");
          return reply(
            `Plese provide an *Image* / *Video* to generate a link!`
          );
        }
        await fs.unlinkSync(media5);
      default:
        break;
    }
  },
};
