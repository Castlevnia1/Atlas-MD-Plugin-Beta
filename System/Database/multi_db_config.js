require("../../Configurations.js");
const config = require("../../Configurations.js");
const useMongodb = config.useMongodb;
const { mk, mku, mkchar } = require("./mongo_schema.js");

const mongoose = require("mongoose");
const { QuickDB, JSONDriver } = require("quick.db");
const jsonDriver = new JSONDriver();
const db = new QuickDB({ driver: jsonDriver });

//mongoDb functions
if (useMongodb) {
  async function searchUser(userID) {
    // search user in database
    return await mku.findOne({ id: userID });
  }
  async function searchGroup(groupID) {
    // search group in database
    return await mk.findOne({ id: groupID });
  }
  async function searchCharacter() {
    // search selected character number in database
    return await mkchar.findOne({ id: "1" });
  }
  async function getBanList() {
    // get ban list
    var banlist = await mku.find({ ban: true });
    return banlist;
  }
  async function banUser(userID) {
    // ban user
    await mku.create({
      id: userID,
      ban: true,
    });
  }
  async function updateBanUser(userID) {
    // update ban user
    await mku.findOneAndUpdate(
      { id: userID },
      { $set: { ban: true } },
      { new: true }
    );
  }
  async function unbanUser(userID) {
    // unban user
    await mku.findOneAndUpdate(
      { id: userID },
      { $set: { ban: false } },
      { new: true }
    );
  }
  async function addMod(userID) {
    // add mod
    await mku.create({ id: userID, addedMods: true });
  }
  async function updateAddMod(userID) {
    // update add mod
    await mku.findOneAndUpdate(
      { id: userID },
      { addedMods: true },
      { new: true }
    );
  }
  async function removeMod(userID) {
    // remove mod
    await mku.create({ id: userId, addedMods: false });
  }
  async function updateRemoveMod(userID) {
    // update remove mod
    await mku.findOneAndUpdate(
      { id: userID },
      { $set: { addedMods: false } },
      { new: true }
    );
  }
  async function createSetCharacter() {
    // create set character
    await mkchar.create({ id: "1", seletedCharacter: "0" });
  }
  async function setCharacter(ID) {
    // set character
    await mkchar.findOneAndUpdate(
      { id: "1" },
      { $set: { seletedCharacter: ID } },
      { new: true }
    );
  }
  async function pmChatbotOn() {
    // pm chatbot on
    await new mkchar({ id: "1", PMchatBot: "true" }).save();
  }
  async function updatePmChatbotOn() {
    // update pm chatbot on
    await mkchar.updateOne({ id: "1" }, { PMchatBot: "true" });
  }
  async function pmChatbotOff() {
    // pm chatbot off
    await new mkchar({ id: "1", PMchatBot: "false" }).save();
  }
  async function updatePmChatbotOff() {
    // update pm chatbot off
    await mkchar.updateOne({ id: "1" }, { PMchatBot: "false" });
  }

  async function banGroup(groupID) {
    // ban group
    await new mk({ id: groupID, bangroup: "true" }).save();
  }
  async function updateBanGroup(groupID) {
    // update ban group
    await mk.updateOne({ id: groupID }, { bangroup: "true" });
  }
  async function unbanGroup(groupID) {
    // unban group
    await new mk({ id: groupID, bangroup: "false" }).save();
  }
  async function updateUnbanGroup(groupID) {
    // update unban group
    await mk.updateOne({ id: groupID }, { bangroup: "false" });
  }
  async function botMode(mode) {
    // bot working mode
    if (mode == "private") {
      await new mkchar({ id: "1", privateMode: "true" }).save();
    } else if (mode == "public") {
      await new mkchar({ id: "1", privateMode: "false" }).save();
    } else if (mode == "self") {
      await new mkchar({ id: "1", privateMode: "self" }).save();
    } else {
      console.log("Error: Invalid mode");
    }
  }
  async function antilinkOn(groupID) {
    // antilink on
    await new mk({ id: groupID, antilink: "true" }).save();
  }
  async function updateAntilinkOn(groupID) {
    // update antilink on
    await mk.updateOne({ id: groupID }, { antilink: "true" });
  }
  async function antilinkOff(groupID) {
    // antilink off
    await new mk({ id: groupID, antilink: "false" }).save();
  }
  async function updateAntilinkOff(groupID) {
    // update antilink off
    await mk.updateOne({ id: groupID }, { antilink: "false" });
  }
  async function chatbotGcOn(groupID) {
    // chatbot on
    await new mk({ id: groupID, chatBot: "true" }).save();
  }
  async function updateChatbotGcOn(groupID) {
    // update chatbot on
    await mk.updateOne({ id: groupID }, { chatBot: "true" });
  }
  async function chatbotGcOff(groupID) {
    // chatbot off
    await new mk({ id: groupID, chatBot: "false" }).save();
  }
  async function updateChatbotGcOff(groupID) {
    // update chatbot off
    await mk.updateOne({ id: groupID }, { chatBot: "false" });
  }
  async function nsfwOn(groupID) {
    // nsfw on
    await new mk({ id: groupID, switchNSFW: "true" }).save();
  }
  async function updateNsfwOn(groupID) {
    // update nsfw on
    await mk.updateOne({ id: groupID }, { switchNSFW: "true" });
  }
  async function nsfwOff(groupID) {
    // nsfw off
    await new mk({ id: groupID, switchNSFW: "false" }).save();
  }
  async function updateNsfwOff(groupID) {
    // update nsfw off
    await mk.updateOne({ id: groupID }, { switchNSFW: "false" });
  }
  async function welcomeOn(groupID) {
    // welcome on
    await new mk({ id: groupID, switchWelcome: "true" }).save();
  }
  async function updateWelcomeOn(groupID) {
    // update welcome on
    await mk.updateOne({ id: groupID }, { switchWelcome: "true" });
  }
  async function welcomeOff(groupID) {
    // welcome off
    await new mk({ id: groupID, switchWelcome: "false" }).save();
  }
  async function updateWelcomeOff(groupID) {
    // update welcome off
    await mk.updateOne({ id: groupID }, { switchWelcome: "false" });
  }

  // Exportig functions
  module.exports = {
    banUser,
    unbanUser,
    addMod,
    removeMod,
    updateAddMod,
    updateRemoveMod,
    createSetCharacter,
    setCharacter,
    pmChatbotOn,
    pmChatbotOff,
    updatePmChatbotOn,
    updatePmChatbotOff,
    banGroup,
    unbanGroup,
    updateBanGroup,
    updateUnbanGroup,
    botMode,
    antilinkOn,
    antilinkOff,
    updateAntilinkOn,
    updateAntilinkOff,
    chatbotGcOn,
    chatbotGcOff,
    updateChatbotGcOn,
    updateChatbotGcOff,
    nsfwOn,
    nsfwOff,
    updateNsfwOn,
    updateNsfwOff,
    welcomeOn,
    welcomeOff,
    updateWelcomeOn,
    updateWelcomeOff,
  };
}else{
  // Using quick.db
  // add same functions as above with same name but using quick DB and export them in same way as above


  // Exportig functions
  module.exports = {
    banUser,
    unbanUser,
    addMod,
    removeMod,
    updateAddMod,
    updateRemoveMod,
    createSetCharacter,
    setCharacter,
    pmChatbotOn,
    pmChatbotOff,
    updatePmChatbotOn,
    updatePmChatbotOff,
    banGroup,
    unbanGroup,
    updateBanGroup,
    updateUnbanGroup,
    botMode,
    antilinkOn,
    antilinkOff,
    updateAntilinkOn,
    updateAntilinkOff,
    chatbotGcOn,
    chatbotGcOff,
    updateChatbotGcOn,
    updateChatbotGcOff,
    nsfwOn,
    nsfwOff,
    updateNsfwOn,
    updateNsfwOff,
    welcomeOn,
    welcomeOff,
    updateWelcomeOn,
    updateWelcomeOff,
  };
}
