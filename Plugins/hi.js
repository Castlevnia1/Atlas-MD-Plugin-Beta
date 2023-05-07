module.exports = {
  name: "hi",
  alias: ["hello", "alive"],
  description: "Say hi to the bot",
  start: async (Atlas, m, { pushName, prefix }) => {
    txt = `Hi ${pushName}! I am ${botName}!`;
    m.reply(txt)
  },
};
