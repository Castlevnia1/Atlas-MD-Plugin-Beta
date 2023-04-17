const axios = require("axios");
const nsfw = ['spreadpussy', 'genshin', 'squirt', 'glasses', 'sunglasses', 'swimsuit', 'schoolswimsuit', 'hololive', 'ass', 'underwear', 'nipples', 'uncensored', 'sex', 'sex2', 'sex3', 'blonde', 'twintails', 'breasts', 'thighhighs', 'skirt', 'gamecg', 'animalears', 'foxgirl', 'dress', 'schooluniform', 'twogirls', 'gloves', 'vocaloid', 'touhou', 'weapon', 'withflowers', 'pinkhair', 'cloudsview', 'white', 'animal', 'tail', 'nude', 'ponytail', 'bed', 'whitehair', 'ribbons', 'japanesecloths', 'hatsunemiku', 'bikini', 'barefoot', 'nobra', 'food', 'wings', 'pantyhose', 'openshirt', 'headband', 'penis', 'close', 'wet', 'catgirl', 'wolfgirl', 'hneko', 'hloli', 'spreadlegs', 'bra', 'fateseries', 'tree', 'elbowgloves', 'greenhair', 'horns', 'withpetals', 'drunk', 'cum', 'headdress', 'tie', 'shorts', 'hmaid', 'headphones', 'anusview', 'Idol', 'gun', 'stockings', 'tears', 'breasthold', 'necklace', 'seethrough', 'bunnyears', 'bunnygirl', 'topless', 'beach', 'erectnipples', 'yuri', 'vampire', 'shirt', 'pantypull', 'tornclothes', 'bondage', 'demon', 'bell', 'shirtlift', 'tattoo', 'chain', 'flatchest', 'fingering']
module.exports = {
  name: "nsfwpics",
  alias: [...nsfw],
  desc: "Hentai picture of animal waifus", 
  category: "Nsfw",
  react: "🍁",
  start: async (Atlas, m, { prefix,NSFWstatus,pushName }) => {

    let commands = m.text.substring(prefix.length).split(" ")[0];
    
    if (NSFWstatus == "false") return m.reply(`This group is not NSFW enabled!\n\nTo configure NSFW mode, type:\n\n*${prefix}nsfw*`);

   
    m.reply(mess.waiting)
    
    let nekoo= await axios.get(`https://fantox-apis.vercel.app/${commands}`)
    let nekokun = nekoo.data.url
    
    
    let neko = {
      image: {url: nekokun},
      caption: `*Yamatte kudasai ${pushName} onichaan!!*`,
      headerType: 4,
    };
    
    await Atlas.sendMessage(m.from, neko, { quoted: m }).catch((err) => {
      return "Error!"; 
    });
    
  },
};
      
