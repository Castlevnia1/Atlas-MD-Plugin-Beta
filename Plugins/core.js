const fs = require("fs");
const axios = require("axios");
const path = require("path");
<<<<<<< HEAD
const package = require("../package.json");
=======
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c
let mergedCommands = [
  "help",
  "h",
  "menu",
  "sc",
  "support",
  "supportgc",
  "script",
<<<<<<< HEAD
  "system",
  "info",
  "about",
];

module.exports = {
  name: "systemcommands",
  alias: [...mergedCommands],
  uniquecommands: ["script", "support", "help", "system", "about"],
  description: "All system commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const pic = fs.readFileSync("./Assets/Atlas.jpg");
=======
];

module.exports = {
  name: "others",
  alias: [...mergedCommands],
  uniquecommands: ["sc", "support"],
  description: "All miscleaneous commands",
  start: async (Atlas, m, { pushName, prefix, inputCMD, doReact }) => {
    let pic = fs.readFileSync("./Assets/Atlas.jpg");
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c
    switch (inputCMD) {
      case "script":
      case "sc":
        await doReact("🧣");
        let repoInfo = await axios.get(
          "https://api.github.com/repos/FantoX001/Atlas-MD"
        );
        let repo = repoInfo.data;
<<<<<<< HEAD
        console.log(repo);
=======
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c
        let txt = `            🧣 *${botName}'s Script* 🧣\n\n*🎀 Total Forks:* ${
          repo.forks_count
        }\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${
          repo.license.name
        }\n*📁 Repo Size:* ${(repo.size / 1024).toFixed(
          2
        )} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:* ${
          repo.html_url
        }\n\n❝ Dont forget to give a Star ⭐ to the repo. It's made with restless hardwork by *Team ATLAS*. ❞\n\n*©️ Team ATLAS- 2023*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt }, { quoted: m });
        break;

      case "support":
      case "supportgc":
        await doReact("🔰");
        let txt2 = `              🧣 *Support Group* 🧣\n\n*${botName}* is an open source project, and we are always happy to help you.\n\n*Link:* ${suppL}\n\n*Note:* Please don't spam in the group, and don't message *Admins directly* without permission. Ask for help inside *Group*.\n\n*Thanks for using Atlas.*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt2 }, { quoted: m });
        break;

      case "help":
      case "h":
      case "menu":
        await doReact("☃️");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `╟   🏮 *${capitalizedFile}* 🏮   ╢\n\n`;
<<<<<<< HEAD
=======
            //formatted += `\`\`\`${commands.join("\n")}\`\`\`\n\n\n`;
            // Adding a - before each command
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c
            formatted += `\`\`\`${commands
              .map((cmd) => `⥼   ${prefix + cmd}`)
              .join("\n")}\`\`\`\n\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\nKonnichiwa *${pushName}* Senpai,\n\nI am *${botName}*, a WhatsApp bot built to take your boring WhatsApp experience into next level.\n\n*🔖 My Prefix is:*  ${prefix}\n\n${formattedCommands}\n\n\n*©️ Team ATLAS- 2023*`;
        await Atlas.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;
<<<<<<< HEAD

      case "system":
      case "info":
      case "about":
        await doReact("🔰");
        let xyz = await axios.get(
          "https://api.github.com/repos/FantoX001/Atlas-MD/releases"
        );
        let latest = xyz.data[0].tag_name;
        const version2 = package.version;
        let nodeVersion = process.version;
        let os = process.platform;
        let osVersion = process.release.lts;
        let architecture = process.arch;
        let computername = process.env.COMPUTERNAME;
        let os2 = process.env.OS;
        let cpu2 = process.env.PROCESSOR_IDENTIFIER;
        let core = process.env.NUMBER_OF_PROCESSORS;

        let txt4 = `            🧣 *System Info* 🧣


*〄 Node Version:* ${nodeVersion}

*〄 OS:* ${os2}

*〄 Platform:* ${os}

*〄 Os Version:* ${osVersion}

*〄 Computer Name:* ${computername}

*〄 CPU:* ${cpu2}

*〄 CPU Core:* ${core}

*〄 CPU Architecture:* ${architecture}

*〄 Current Bot version:* ${latest}

*〄 Latest Bot version:* ${latest}
`;

        if (latest.includes(version2) || version2.includes(latest)) {
          txt4 += `\n\n*⚠️ Bot Update Available:*`;
        } else txt4 += `\n\n*🔰 Bot is up to date.*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt4 }, { quoted: m });

        break;

=======
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c
      default:
        break;
    }
  },
};
