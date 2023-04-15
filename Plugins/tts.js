const tts = require("google-tts-api");
let mergedCommands = [
  "say",
  "speak",
  "tts",
  "saybengali",
  "saybangla",
  "sayhindi",
  "sayja",
  "sayjapanese",
  "saykorean",
  "saychinese",
  "sayindo",
  "sayindonesian",
];

module.exports = {
  name: "texttospeech",
  alias: [...mergedCommands],
  description: "All Text to Speech Commands",
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
      mentionByTag,
      mime,
      isMedia,
      quoted,
    }
  ) => {
    let sayMess;
    if (!text && !m.quoted) {
      await doReact("❌");
      return reply(
        `Please provide a text (Type or mention a message) !\n\nExample: ${prefix}say Atlas MD is OP`
      );
    }
    if (!isMedia) {
      sayMess = m.quoted
        ? m.quoted.msg
        : args[0]
        ? args.join(" ")
        : "No text found";
    } else {
      await doReact("❌");
      return reply(
        `Please provide a text (Type or mention a message) !\n\nExample: ${prefix}say Atlas MD is OP`
      );
    }
    switch (inputCMD) {
      case "say":
      case "speak":
      case "tts":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "en",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });

        break;

      case "saybengali":
      case "saybangla":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "bn",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });

        break;

      case "sayhindi":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "hi",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });

        break;

      case "sayja":
      case "sayjapanese":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "ja",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });
        break;

      case "saykorean":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "ko",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });
        break;

      case "saychinese":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "zh-SG",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });

        break;

      case "sayindo":
      case "sayindonesian":
        await doReact("🪄");
        texttospeechurl = tts.getAudioUrl(sayMess, {
          lang: "id",
          slow: false,
          host: "https://translate.google.com",
        });

        await Atlas.sendMessage(
          m.from,
          { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
          { quoted: m }
        ).catch((e) => {
          reply(`An error Occurd !`);
        });

        break;

      default:
        break;
    }
  },
};
