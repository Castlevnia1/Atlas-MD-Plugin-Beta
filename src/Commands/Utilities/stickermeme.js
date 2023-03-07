const { Sticker, StickerTypes } = require('wa-sticker-formatter')
let { TelegraPh } = require("../../Lib/uploader");
const fs = require("fs");

module.exports = {
    name: "stickermeme",
    alias: ["smeme"],
    desc: "To make sticker meme",
    category: "Utilities",
    usage: "smeme <reply to image>",
    react: "🍁",
    start: async (Akeno, m, { text, prefix,quoted,pushName,mime,body }) => {
        if (/image/.test(mime)) {
            m.reply(`Chotto Matte...`)
            media = await Akeno.downloadAndSaveMediaMessage(quoted)
            mem = await TelegraPh(media)
            meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`

            let stickerMess = new Sticker(meme, {
                pack: packname,
                author: pushName,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 70,
                background: 'transparent'
            });
        
            const stickerBuffer2 = await stickerMess.toBuffer()
            await Akeno.sendMessage(m.from, {sticker:stickerBuffer2}, { quoted: m })
            fs.unlinkSync(media);
            }
            else{
                m.reply(`Please mention an *image* and type *${prefix}smeme* to create sticker meme.`);
            }
        }
    }
            