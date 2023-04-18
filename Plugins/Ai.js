const fs = require("fs");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");



let mergedCommands = [
  "gpt", 
];

module.exports = {
  name: "Ai",
  alias: [...mergedCommands],
  description: "AI Commands",
  start: async (Atlas, m, { inputCMD, text, mods, groupName, isCreator, db, bans, prefix, doReact, args, itsMe, participants, metadata, mentionByTag, mime, isMedia, quoted, botNumber, isBotAdmin, groupAdmin, isAdmin, pushName }) => {
    switch (inputCMD) {
        case "gpt":
            if (!args.join(" ")) {
                return m.reply(`Please provide a message!`);
              }
          
              const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          
              async function generateResponse(prompt, retries = 2) {
                try {
                  const configuration = new Configuration({
                    apiKey: process.env.OPENAI_API_KEY,
                  });
                  const openai = new OpenAIApi(configuration);
          
                  const completion = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                  });
          
                  console.log("API Key:", process.env.OPENAI_API_KEY);
          
                  return completion.data.choices[0].message.content.trim();
                } catch (error) {
                  if (error.response && error.response.status === 429 && retries > 0) {
                    const retryAfter = error.response.headers["retry-after"] * 1000 || 5000;
                    m.reply(`Rate limit exceeded. Retrying in ${retryAfter / 1000} seconds...`);
                    await sleep(retryAfter);
                    return generateResponse(prompt, retries - 1);
                  } else {
                    console.error(error);
                    return "Error occurred while generating response";
                  }
                }
              }
          
              const userInput = args.join(" ");
              generateResponse(userInput)
                .then((response) => {
                  m.reply(response);
                  console.log(userInput);
                })
                .catch((error) => {
                  console.error("Error getting response:", error);
                });
            }
          }
        }
