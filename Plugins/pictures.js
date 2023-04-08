const fs = require("fs");
const gis = require("g-i-s");
const axios = require("axios");
let mergedCommands = [
  "gig",
  "gimage",
  "googleimage",
  "image",
  "ppcouple",
  "couplepp",
  "gifsearch",
  "gif",
];

module.exports = {
  alias: [...mergedCommands],
  description: "All miscleaneous commands",
  start: async (Atlas, m, { inputCMD, text,doReact }) => {
    switch (inputCMD) {
      case "ppcouple":
      case "couplepp":
        doReact("❤️");
        let imgRes = await axios.get("https://neko-couple-api.onrender.com");
        Atlas.sendMessage(
          m.from,
          { image: { url: imgRes.data.male }, caption: `_For Him..._` },
          { quoted: m }
        );
        Atlas.sendMessage(
            m.from,
          { image: { url: imgRes.data.female }, caption: `_For Her..._` },
          { quoted: m }
        );
        break;

      case "gig":
      case "gimage":
      case "googleimage":
      case "image":
        if (!text) {
            doReact("❔").then(() => {
                return reply("Please provide an image Search Term !");
            });
            return;        
        }
        doReact("🎴");
        gis(text, async (error, result) => {
          n = result;
          let images = n[Math.floor(Math.random() * n.length)].url;
          let resText = `\n_🎀 Image Search Term:_ *${text}*\n\n_🧩 Powered by_ *${botName}*\n`;
          /*
          let buttons = [
            {
                buttonId: `${prefix}gimage ${text}`,
                buttonText: { displayText: ">>" },
                type: 1,
            },
          ];
          */
          await Atlas.sendMessage(
            m.from,
            {
              image: {url: images,},
              caption: resText,
              //footer: `*${botName}*`,
              //buttons: buttons,
              //headerType: 4,
            },
            { quoted: m }
          );
        });
        break;
        case "gif":
        case "gifsearch":
            if (!text) {
                doReact("❔").then(() => {
                    return reply("Please provide an Tenor gif Search Term !");
                });
                return;        
            }
            doReact("🎴");
            let resGif = await axios.get(
                `https://tenor.googleapis.com/v2/search?q=${text}&key=${tenorApiKey}&client_key=my_project&limit=12&media_filter=mp4`
              );
            let resultGif = Math.floor(Math.random() * 12);
            let gifUrl = resGif.data.results[resultGif].media_formats.mp4.url;
            await Atlas.sendMessage(m.from, {video: { url: gifUrl}, gifPlayback: true, caption: `🎀 Gif serach result for: *${text}*\n`,}, { quoted: m });
        break;

      default:
        break;
    }
  },
};
