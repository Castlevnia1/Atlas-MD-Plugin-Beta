const maker = require("mumaker");

let mergedCommands = [
  "3dcristmas",
  "3dneon",
  "3dspace",
  "3dstone",
  "bear",
  "blackpink",
  "blood",
  "bookeh",
  "candy",
  "carbon",
  "chocolate",
  "christmas",
  "cloud",
  "circuit",
  "deepsea",
  "dropwater",
  "glitch",
  "glitch2",
  "glitch3",
  "graffiti",
  "joker",
  "lion",
  "holographic",
  "magma",
  "matrix",
  "neon",
  "neonlight",
  "neongreen",
  "papercut",
  "pencil",
  "pornhub",
  "scifi",
  "sparklechristmas",
  "thunder",
  "thunder2",
  "wolf",
  "wall",
  "transformer",
];
module.exports = {
  name: "logomaker",
  alias: [...mergedCommands],
  description: "All Logo maker Commands",
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
    if (inputCMD == "logomaker") return reply("choose logomaker from menu");
    await doReact("🎑");
    switch (inputCMD) {
      case "3dcristmas":
        if (!text) return reply(`Example: *${prefix}3dchristmas Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/3d-christmas-text-effect-by-name-1055.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "3dneon":
        if (!text) return reply(`Example: *${prefix}3dneon Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "3dspace":
        if (!text.includes(","))
          return reply(`Example: *${prefix}3dspace Atlas Bot , Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/create-space-3d-text-effect-online-985.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "3dstone":
        if (!text) return reply(`Example: *${prefix}3dstone Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "bear":
        if (!text.includes(","))
          return reply(`Example: *${prefix}bear Atlas Bot , Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "blackpink":
        if (!text) return reply(`Example: *${prefix}blackpink Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-blackpink-logo-style-online-1001.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));

        break;

      case "blood":
        if (!text) return reply(`Example: *${prefix}blood Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/horror-blood-text-effect-online-883.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "bokeh":
        if (!text) return reply(`Example: *${prefix}bokeh Atlas Bot*`);
        maker
          .textpro("https://textpro.me/bokeh-text-effect-876.html", [`${text}`])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "candy":
        if (!text) return reply(`Example: *${prefix}candy Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-christmas-candy-cane-text-effect-1056.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "carbon":
        if (!text) return reply(`Example: *${prefix}carbon Atlas Bot*`);
        maker
          .textpro("https://textpro.me/carbon-text-effect-833.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "chocolate":
        if (!text) return reply(`Example: *${prefix}chocolate Atlas Bot*`);
        maker
          .textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "christmas":
        if (!text) return reply(`Example: *${prefix}christmas Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/christmas-tree-text-effect-online-free-1057.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "circuit":
        if (!text) return reply(`Example: *${prefix}circuit Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "cloud":
        if (!text) return reply(`Example: *${prefix}cloud Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "deepsea":
        if (!text) return reply(`Example: *${prefix}deepsea Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "demon":
        if (!text) return reply(`Example: *${prefix}demon Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-green-horror-style-text-effect-online-1036.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "dropwater":
        if (!text) return reply(`Example: *${prefix}dropwater Atlas Bot*`);
        maker
          .textpro("https://textpro.me/dropwater-text-effect-872.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "glitch":
        if (!text) return reply(`Example: *${prefix}glitch Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "glitch2":
        if (!text.includes(","))
          return reply(`Example: *${prefix}glitch2 Atlas Bot , Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "glitch3":
        if (!text.includes(","))
          return reply(`Example: *${prefix}glitch3 Atlas Bot , Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "graffiti":
        if (!text.includes(","))
          return reply(`Example: *${prefix}graffiti Atlas Bot,Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "hollographic":
        if (!text) return reply(`Example: *${prefix}holographic Atlas Bot*`);
        maker
          .textpro("https://textpro.me/holographic-3d-text-effect-975.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "joker":
        if (!text) return reply(`Example: *${prefix}joker Atlas Bot*`);
        maker
          .textpro("https://textpro.me/create-logo-joker-online-934.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "lion":
        if (!text.includes(","))
          return reply(`Example: *${prefix}lion Atlas Bot , Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/create-lion-logo-mascot-online-938.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "magma":
        if (!text) return reply(`Example: *${prefix}magma Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "matrix":
        if (!text) return reply(`Example: *${prefix}matrix Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/matrix-style-text-effect-online-884.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "neon":
        if (!text) return reply(`Example: *${prefix}neon Atlas Bot*`);
        maker
          .textpro("https://textpro.me/neon-text-effect-online-879.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "neondevil":
        if (!text) return reply(`Example: *${prefix}neondevil Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "neongreen":
        if (!text) return reply(`Example: *${prefix}neonlight Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "neonlight":
        if (!text) return reply(`Example: *${prefix}neonlight Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "papercut":
        if (!text) return reply(`Example: *${prefix}papercut Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "pencil":
        if (!text) return reply(`Example: *${prefix}pencil Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-a-sketch-text-effect-online-1044.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "pornhub":
        if (!text.includes(","))
          return reply(`Example: *${prefix}pornhub Atlas Bot,Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/pornhub-style-logo-online-generator-free-977.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "scifi":
        if (!text) return reply(`Example: *${prefix}scifi Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "sparklechristmas":
        if (!text) return reply(`Example: *${prefix}schristmas Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/sparkles-merry-christmas-text-effect-1054.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "thunder":
        if (!text) return reply(`Example: *${prefix}thunder Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/online-thunder-text-effect-generator-1031.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "transformer":
        if (!text) return reply(`Example: *${prefix}transformer Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-a-transformer-text-effect-online-1035.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "thunder2":
        if (!text) return reply(`Example: *${prefix}thunder2 Atlas Bot*`);
        maker
          .textpro(
            "https://textpro.me/create-thunder-text-effect-online-881.html",
            [`${text}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "wall":
        if (!text) return reply(`Example: *${prefix}wall Atlas Bot*`);
        maker
          .textpro("https://textpro.me/break-wall-text-effect-871.html", [
            `${text}`,
          ])
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      case "wolf":
        if (!text.includes(","))
          return reply(`Example: *${prefix}wolf Atlas Bot , Team Atlas*`);
        teks1 = text.split(",")[0];
        teks2 = text.split(",")[1];
        maker
          .textpro(
            "https://textpro.me/create-wolf-logo-galaxy-online-936.html",
            [`${teks1}`, `${teks2}`]
          )
          .then((data) =>
            Atlas.sendMessage(
              m.from,
              { image: { url: data }, caption: `Made by ${botName}` },
              { quoted: m }
            )
          )
          .catch((err) => reply("An Error occued !"));
        break;

      default:
        break;
    }
  },
};
