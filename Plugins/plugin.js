const got = require("got");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "plugins",
  alias: ["install"],
  description: "Say hi to the bot",
  category: "fun",
  usage: "hi",
  start: async (client, m, { text, args, pushName, prefix }) => {
    try {
      var url = new URL(text);
    } catch (e) {
      console.log(e);
      return await client.sendMessage(
        m.from,
        { text: `Invalid URL` },
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
        var folderName = 'Plugins';
        var fileName = path.basename(url);
        var filePath = path.join(folderName, fileName);
        fs.writeFileSync(filePath, body);
        console.log('File saved successfully!');
      } catch (error) {
        console.log('Error:', error);
      }

      return await client.sendMessage(
        m.from,
        { text: `Plugin installed` },
        { quoted: m }
      );
    }
  },
};
