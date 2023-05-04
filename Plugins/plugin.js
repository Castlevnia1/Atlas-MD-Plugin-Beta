const got = require("got");
const fs = require("fs");
const path = require("path");
const { readcommands } = require("../System/ReadCommands.js");
const { exec } = require("child_process");
const {
  pushPlugin, // -------------------- PUSH NEW INSTALLED PLUGIN IN DATABASE
  getPlugin, // --------------------- GET ALL PLUGIN NAMES AS AN ARRAY
  delPlugin, // --------------------- DELETE A PLUGIN FROM THE DATABASE
} = require("../System/SiliconDB/siliconDB-config.js");

let mergedCommands = ["install", "uninstall", "plugins"];
module.exports = {
  name: "plugins",
  alias: [...mergedCommands],
  description: "Install, Uninstall, List plugins",
  start: async (Atlas, m, { text, args, pushName, prefix, inputCMD }) => {
    switch (inputCMD) {
      case "install":
        try {
          var url = new URL(text);
        } catch (e) {
          console.log(e);
          return await client.sendMessage(
            m.from,
            { text: `Invalid URL !` },
            { quoted: m }
          );
        }

        if (url.host === "gist.github.com") {
          url.host = "gist.githubusercontent.com";
          url = url.toString() + "/raw";
        } else {
          url = url.toString();
        }
        var { body, statusCode } = await got(url);
        if (statusCode == 200) {
          try {
            var folderName = "Plugins";
            var fileName = path.basename(url);
            chackInstallationArray = await getPlugin(fileName);
            // check if plugin is already installed and present in that Database array
            if (chackInstallationArray.includes(fileName)) {
              return reply(`*${fileName}* plugin is already installed !`);
            }
            // Check if that file is present in same directory
            if (!fs.existsSync(`./Plugins/${fileName}`)) {
              return reply(`*${fileName}* plugin is already installed !`);
            }


            var filePath = path.join(folderName, fileName);
            fs.writeFileSync(filePath, body);
            console.log("Plugin saved successfully!");
          } catch (error) {
            console.log("Error:", error);
          }
          await reply(`Installing *${fileName}*... `);
          await readcommands();
          await pushPlugin(fileName);
          await reply(`*${fileName}* Installed Successfully !`);
        }
        break;

      case "uninstall":
        break;

      case "plugins":
        break;

      default:
        break;
    }
  },
};
