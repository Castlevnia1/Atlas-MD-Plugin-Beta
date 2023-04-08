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
];

module.exports = {
  alias: [...mergedCommands],
  description: "All miscleaneous commands",
  start: async (Atlas, m, { pushName, prefix, inputCMD, chat, text,doReact }) => {
    let pic = fs.readFileSync("./Assets/Atlas.jpg");
    switch (inputCMD) {
      case "ppcouple":
      case "couplepp":
        doReact("❤️");
        let imgRes = await axios.get("https://neko-couple-api.onrender.com");
        Atlas.sendMessage(
          chat,
          { image: { url: imgRes.data.male }, caption: `_For Him..._` },
          { quoted: m }
        );
        Atlas.sendMessage(
          chat,
          { image: { url: imgRes.data.female }, caption: `_For Her..._` },
          { quoted: m }
        );
        break;

      case "gig":
      case "gimage":
      case "googleimage":
      case "image":
        if (!text) {
            doReact("❓").then(() => {
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
            chat,
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

      default:
        break;
    }
  },
};
