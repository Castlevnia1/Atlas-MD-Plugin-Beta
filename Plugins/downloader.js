const axios = require("axios");
const cheerio = require('cheerio');
let mergedCommands = ["igdl", "instadl", "mediafiredl", "mediafire"];

module.exports = {
  name: "mediaDownloader",
  alias: [...mergedCommands],
  description: "All file dowloader commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName }) => {
    switch (inputCMD) {
      case "igdl":
      case "instadl":
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

      case "mediafiredl":
      case "mediafire":
        if (!text) {
          await doReact("❌");
          return reply(
            `Please provide a valid Mediafire link !\n\nExample: *${prefix}mediafire put_link*`
          );
        }
        if (!text.includes("mediafire.com")) {
          await doReact("❌");
          return reply(
            `Please provide a valid Mediafire link !\n\nExample: *${prefix}mediafire put_link*`
          );
        }

        const MDF = await mediafireDl(text)
        if (MDF[0].size.split('MB')[0] >= 100) return m.reply('File is too large in size!');

        let txt = `        *『 Mediafire Downloader 』*
        
        *🎀 File Name* : ${MDF[0].nama}
        *🧩 File Size* : ${MDF[0].size}
        *📌File Format* : ${MDF[0].mime}
        Downloading...`

        await doReact("📥");
        await reply(txt);

        Atlas.sendMessage(m.from, { document: { url: MDF[0].url },mimetype: MDF[0].mime,fileName: MDF[0].nama,},{ quoted: m });
        break;

      default:
        break;
    }
  },
};

async function mediafireDl(url) {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const results = []
  const link = $('a#downloadButton').attr('href')
  const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
  const seplit = link.split('/')
  const res5 = seplit[5]
  resdl = res5.split('.')
  resdl = resdl[1]
  results.push({ res5, resdl, size, link })
  return results
}
