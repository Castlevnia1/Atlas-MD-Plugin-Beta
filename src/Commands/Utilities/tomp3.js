let {toAudio} = require('../../Lib/FileConverter');

module.exports = {
    name: "tomp3",
    alias: ["getmp3"],
    desc: "To get .mp3 file from a voice note or video",
    category: "Utilities",
    usage: "tomp3 <reply to audio/video>",
    react: "🍁",
    start: async (Akeno, m, { text, prefix, quoted, pushName, mime, body }) => {
        if (/document/.test(mime)) return m.reply(`Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`);
        if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`);
        if (!m.quoted) return m.reply(`Send/Reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix}tomp3`);
        let media = await quoted.download()
        let audio = await toAudio(media, 'mp4')
        Akeno.sendMessage(m.from, {document: audio, mimetype: 'audio/mpeg', fileName: `Converted By ${botName} ${m.id}.mp3`}, { quoted : m })
    }
}