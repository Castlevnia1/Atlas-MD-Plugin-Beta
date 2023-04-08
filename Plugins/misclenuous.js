const fs = require("fs");
const axios = require("axios");
let mergedCommands = ["script","test"]

module.exports = {
    name: "testing",
    alias: ["sc", ...mergedCommands],
    description: "Get all commands list",
    start: async (Atlas, m, { pushName, prefix,inputCMD,chat }) => {
      if (inputCMD=="help"){
        reply("This is help menu")
        }
      
      else if (inputCMD=="script" || inputCMD=="sc"){
        let pic = fs.readFileSync('./Assets/Atlas.jpg');
        let repoInfo = await axios.get('https://api.github.com/repos/FantoX001/Atlas-MD');
        let repo = repoInfo.data;
        let txt = `            🧣 *${botName}'s Script* 🧣\n\n*🎀 Total Forks:* ${repo.forks_count}\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${repo.license.name}\n*📁 Repo Size:* ${(repo.size/1024).toFixed(2)} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:* ${repo.html_url}\n\n❝ Dont forget to give a Star ⭐ to the repo. It's made with restless harkwork by *Team ATLAS*. ❞\n\n*©️ Team ATLAS- 2023*`
        Atlas.sendMessage(chat,{image:pic, caption:txt},{quoted:m});
        }
      else if (inputCMD=="test"){
        }
      
      else{
        return;
      }
    },
  };
  