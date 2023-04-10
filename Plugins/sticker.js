const fs = require("fs");
const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { getRandom } = require("../System/Function2.js");
let { TelegraPh } = require("../System/Uploader.js")
const Jimp = require("jimp");
const moment = require("moment-timezone");
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
  start: async (
    Atlas,
    m,
    {
      inputCMD,
      text,
      pushName,
      prefix,
      doReact,
      args,
      itsMe,
      participants,
      metadata,
      mentionByTag,
      mime,
      isMedia,
      quoted,
      botNumber,
      isBotAdmin,
      groupAdmin,
      isAdmin,
    }
  ) => {
    switch (inputCMD) {
      case "s":
      case "sticker":
        doReact("🔖");
        if (/image/.test(mime)) {
          let mediaMess = await quoted.download();
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer }, { quoted: m });
        } else if (/video/.test(mime)) {
          let mediaMess = await quoted.download();
          if ((quoted.msg || quoted).seconds > 15)
            return Atlas.sendMessage(
              m.from,
              { text: "Please send video less than 15 seconds." },
              { quoted: m }
            );
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer2 }, { quoted: m });
        } else {
          Atlas.sendMessage(
            m.from,
            {
              text: `Please mention an *image/video* and type *${prefix}s* to create sticker.`,
            },
            { quoted: m }
          );
        }
        break;

      case "steal":
      case "take":
        doReact("🀄️");
        if (!args.join(" ")) {
          var packName = pushName;
          var authorName = pushName;
        } else if (args.join(" ").includes(",")) {
          var packName = args.join(" ").split(",")[0];
          var authorName = args.join(" ").split(",")[1];
        } else {
          var packName = args.join(" ");
          var authorName = args.join(" ");
        }
        if (/webp/.test(mime)) {
          let mediaMess = await quoted.download();
          let stickerMess = new Sticker(mediaMess, {
            pack: packName,
            author: authorName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer }, { quoted: m });
        } else {
          Atlas.sendMessage(
            m.from,
            {
              text: `Please mention a *Sticker* and type *${prefix}steal <packname , authorname>* to create sticker with your name.`,
            },
            { quoted: m }
          );
        }

        break;

      case "scrop":
      case "stickercrop":
        doReact("🃏");
        if (/image/.test(mime)) {
          let mediaMess = await quoted.download();
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer }, { quoted: m });
        } else if (/video/.test(mime)) {
          let mediaMess = await quoted.download();
          if ((quoted.msg || quoted).seconds > 15)
            return Atlas.sendMessage(
              m.from,
              { text: "Please send video less than 15 seconds." },
              { quoted: m }
            );
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer2 }, { quoted: m });
        } else {
          Atlas.sendMessage(
            m.from,
            {
              text: `Please mention an *imade/video* and type *${prefix}s* to create cropped sticker.`,
            },
            { quoted: m }
          );
        }
        break;

      case "smeme":
      case "stickermeme":
        doReact("📮");
        if (/image/.test(mime)) {
          if(!text) return reply(`Please type *${prefix}smeme <text>* to create sticker meme.`)
          media = await Atlas.downloadAndSaveMediaMessage(quoted);
          mem = await TelegraPh(media);
          meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`;

          let stickerMess = new Sticker(meme, {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });

          const stickerBuffer2 = await stickerMess.toBuffer();
          await Atlas.sendMessage(
            m.from,
            { sticker: stickerBuffer2 },
            { quoted: m }
          );
          fs.unlinkSync(media);
        } else {
          reply(
            `Please mention an *image* and type *${prefix}smeme* to create sticker meme.`
          );
        }
        break;

      case "q":
      case "quote":
    doReact("📮");
      if (!text && !m.quoted)
      return reply(`Please provide a text (Type or mention a message) !`)
      
        if (m.quoted){
          try {
            userPfp = await Atlas.profilePictureUrl(m.quoted.sender, "image");
          } catch (e) {
            userPfp = botImage3;
          }
        }
        else{
          try {
            userPfp = await Atlas.profilePictureUrl(m.sender, "image");
          } catch (e) {
            userPfp = botImage3;
          }
        }
        var waUserName = pushName;

        const quoteText = m.quoted ? m.quoted.msg : args ? args.join(" ") : "";
    
        var quoteJson = {
          type: "quote",
          format: "png",
          backgroundColor: "#FFFFFF",
          width: 700,
          height: 580,
          scale: 2,
          messages: [
            {
              entities: [],
              avatar: true,
              from: {
                id: 1,
                name: waUserName,
                photo: {
                  url: userPfp,
                },
              },
              text: quoteText,
              replyMessage: {},
            },
          ],
        };
    
        const quoteResponse = await axios
          .post("https://bot.lyo.su/quote/generate", quoteJson, {
            headers: { "Content-Type": "application/json" },
          })
    
          fs.writeFileSync("quote.png", quoteResponse.data.result.image, "base64");
    
    
          let stickerMess = new Sticker("quote.png", {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 70,
            background: 'transparent'
        });
    
        const stickerBuffer2 = await stickerMess.toBuffer()
        await Atlas.sendMessage(m.from, {sticker:stickerBuffer2}, { quoted: m }).then((result) => {
          fs.unlinkSync("quote.png");
        }).catch((err) => {
          reply("An error occurd!")
        });

        break;

      default:
        break;
    }
  },
};
