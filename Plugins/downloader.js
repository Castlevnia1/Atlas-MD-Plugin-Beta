const axios = require("axios");
const yts = require("youtube-yts");
const googleit = require("google-it");
const { ringtone } = require("../System/Scrapers");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

let mergedCommands = ["igdl", "mediafireDl"];

module.exports = {
  name: "mediaDownloader",
  alias: [...mergedCommands],
  description: "All file dowloader commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName }) => {
    switch (inputCMD) {
      case "igdl":
        if (!text) {
          await doReact("❌");
          return reply(
            `Please provide a valid instagram Reel/Video link !\n\nExample: *${prefix}igdl https://www.instagram.com/p/CP7Y4Y8J8ZU/*`
          );
        }
        if (!text.includes("instagram")) {
          await doReact("❌");
          return reply(
            `Please provide a valid instagram Reel/Video link !\n\nExample: *${prefix}igdl https://www.instagram.com/p/CP7Y4Y8J8ZU/*`
          );
        }
        await doReact("📥");
        await Atlas.sendMessage(
          m.from,
          { text: "*Please wait, I'm downloading your video...*" },
          { quoted: m }
        );

        res = await axios.get(
          "https://fantox001-scrappy-api.vercel.app/instadl?url=" + text
        );
        scrappedURL = res.data.videoUrl;

        Atlas.sendMessage(
          m.from,
          {
            video: { url: scrappedURL },
            caption: `Downloaded by: *${botName}* \n\n_*Powered by:*_ *Scrappy API - by FantoX*\n\n_*Url:*_ https://github.com/FantoX001/Scrappy-API \n`,
          },
          { quoted: m }
        );
        break;

      default:
        break;
    }
  },
};
