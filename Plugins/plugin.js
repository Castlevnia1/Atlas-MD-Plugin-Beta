const got = require("got");
const fs = require("fs");
const path = require("path");
const { readcommands } = require("../System/ReadCommands.js");
const { exec } = require("child_process");
const {
  pushPlugin, // -------------------- PUSH NEW INSTALLED PLUGIN IN DATABASE
  isPluginPresent, // --------------- CHECK IF PLUGIN IS ALREADY PRESENT IN DATABASE
  delPlugin, // --------------------- DELETE A PLUGIN FROM THE DATABASE
} = require("../System/MongoDB/MongoDb_Core.js");
const {db2} = require("../System/MongoDB/MongoDB_Schema.js");

let mergedCommands = ["install", "uninstall", "plugins", "pluginlist"];
module.exports = {
  name: "plugininstaller",
  alias: [...mergedCommands],
  uniquecommands: ["install", "uninstall", "plugins"],
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
            isPluginPresent = await isPluginPresent(fileName);
            if (isPluginPresent) {
              return m.reply(`*${fileName}* plugin is already Installed !`);
            }

            // Check if that file is present in same directory
            if (fs.existsSync(`./Plugins/${fileName}`)) {
              return m.reply(
                `*${fileName}* plugin is already Present Locally !`
              );
            }

            var filePath = path.join(folderName, fileName);
            fs.writeFileSync(filePath, body);
            console.log("Plugin saved successfully!");
          } catch (error) {
            console.log("Error:", error);
          }
          await m.reply(`Installing *${fileName}*... `);
          await readcommands();
          await pushPlugin(fileName, text);
          await m.reply(`*${fileName}* Installed Successfully !`);
        }
        break;

      case "pluginlist":
      case "plugins":
        pluginsCollection = db2.collection("plugins");
        const plugins = await pluginsCollection.find();
        if (!plugins.length) {
          await Atlas.sendMessage(
            m.from,
            { text: `No Plugins Found !` },
            { quoted: m }
          );
        } else {
          let txt = "";
          for (var plugin of plugins) {
            txt += "*『    Installed Plugins List    』*\n\n";
            txt += `🔖 *Plugin ${plugin.plugin}*\n*🎀 Name:* ${plugin.name}\n*🧩 Url:* ${plugin.url}\n\n`;
          }
          txt += `⚜️ To uninstall a plugin type *uninstall* plugin-name !\n\nExample: *${prefix}uninstall* audioEdit.js`;
          await Atlas.sendMessage(m.from, { text: txt }, { quoted: m });
        }

        break;

      case "uninstall":
        if (!text) {
          return await m.reply(
            `Please provide a plugin name !\n\nExample: *${prefix}uninstall* audioEdit.js`
          );
        }

        fileName = text;

        pluginsCollection = db2.collection("plugins");

        plugin = await pluginsCollection.findOne({ name: fileName });

        if (!plugin) {
          return await m.reply(`*${fileName}* plugin is not installed !`);
        }

        if (fs.existsSync(`./Plugins/${fileName}`)) {
          fs.unlinkSync(`./Plugins/${fileName}`);
          await pluginsCollection.deleteOne({ name: fileName });
          await readcommands();
          await m.reply(
            `*${fileName}* plugin uninstalled successfully !\n\nPlease restart the bot to clear cache !`
          );
        } else {
          return await m.reply(`*${fileName}* plugin is not installed !`);
        }

        break;

      default:
        break;
    }
  },
};
