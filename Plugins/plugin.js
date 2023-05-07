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

let mergedCommands = ["install", "uninstall", "plugins", "pluginlist"];
module.exports = {
  name: "plugininstaller",
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
            fileName = path.basename(url);

            // check if plugin is already installed and present in that Database array
            chackInstallationArray = await getPlugin();
            if (chackInstallationArray != undefined) {
              for (let i = 0; i < chackInstallationArray.length; i++) {
                if (chackInstallationArray[i].name == fileName) {
                  return reply(`*${fileName}* plugin is already installed !`);
                }
              }
            }
            // Check if that file is present in same directory
            if (fs.existsSync(`./Plugins/${fileName}`)) {
              return reply(`*${fileName}* plugin is already Present Locally !`);
            }

            var filePath = path.join(folderName, fileName);
            fs.writeFileSync(filePath, body);
            console.log("Plugin saved successfully!");
          } catch (error) {
            console.log("Error:", error);
          }
          await reply(`Installing *${fileName}*... `);
          await readcommands();
          await pushPlugin(fileName, text);
          await reply(`*${fileName}* Installed Successfully !`);
        }
        break;

      case "pluginlist":
      case "plugins":
        installedPlugins = await getPlugin();
        if (installedPlugins != undefined) {
          let txt = "";
          for (let i = 0; i < installedPlugins.length; i++) {
            txt += "*『    Installed Plugins List    』*\n\n";
            txt += `🔖 *Plugin ${i + 1}*\n*🎀 Name:* ${
              installedPlugins[i].name
            }\n*🧩 Url:* ${installedPlugins[i].url}\n\n`;
          }
          txt += `⚜️ To uninstall a plugin type *uninstall* plugin-name !\n\nExample: *${prefix}uninstall* audioEdit.js`;
          await Atlas.sendMessage(m.from, { text: txt }, { quoted: m });
        } else {
          await Atlas.sendMessage(
            m.from,
            { text: `No Plugins Found !` },
            { quoted: m }
          );
        }

        break;

      case "uninstall":
        if (!text) {
          return await reply(
            `Please provide a plugin name !\n\nExample: *${prefix}uninstall* audioEdit.js`
          );
        }
        fileName = text;
        installedPlugins = await getPlugin();
        if (installedPlugins != undefined && installedPlugins.length > 0) {
          const plugin = installedPlugins.find((p) => p.name === fileName);
          if (plugin) {
            if (fs.existsSync(`./Plugins/${fileName}`)) {
              fs.unlinkSync(`./Plugins/${fileName}`);
              await delPlugin(fileName);
              await readcommands();
              await reply(`*${fileName}* plugin uninstalled successfully !`);
            } else {
              return Atlas.sendMessage(
                m.from,
                { text: `*${fileName}* plugin is not installed !` },
                { quoted: m }
              );
            }
          } else {
            return Atlas.sendMessage(
              m.from,
              { text: `*${fileName}* plugin is not installed !` },
              { quoted: m }
            );
          }
        } else {
          Atlas.sendMessage(
            m.from,
            { text: `*${fileName}* plugin is not installed !` },
            { quoted: m }
          );
        }
        break;

      default:
        break;
    }
  },
};
