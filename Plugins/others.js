const fs = require("fs");
const axios = require("axios");
let mergedCommands = ["sc", "support", "supportgc","script"];

module.exports = {
  name: "others",
  alias: [...mergedCommands],
  description: "All miscleaneous commands",
  start: async (Atlas, m, { pushName, prefix, inputCMD }) => {
    let pic = fs.readFileSync("./Assets/Atlas.jpg");
    switch (inputCMD) {
      case "script": case "sc":
        let repoInfo = await axios.get(
          "https://api.github.com/repos/FantoX001/Atlas-MD"
        );
        let repo = repoInfo.data;
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
        let txt2 = `              🧣 *Support Group* 🧣\n\n*${botName}* is an open source project, and we are always happy to help you.\n\n*Link:* ${suppL}\n\n*Note:* Please don't spam in the group, and don't message *Admins directly* without permission. Ask for help inside *Group*.\n\n*Thanks for using Atlas.*`
        Atlas.sendMessage(m.from,{image:pic, caption:txt2},{quoted:m})
      break;

      default:
        break;
    }
  },
};
