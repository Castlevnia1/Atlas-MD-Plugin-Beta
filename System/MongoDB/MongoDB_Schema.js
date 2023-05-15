const mongoose = require("mongoose");
const config = require("../../Configurations.js");

const db1 = mongoose.createConnection(config.mongodb);
const db2 = mongoose.createConnection(config.mongodb);

const GroupSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  antilink: { type: Boolean, default: false },
  nsfw: { type: Boolean, default: false },
  bangroup: { type: Boolean, default: false },
  chatBot: { type: Boolean, default: false },
  botSwitch: { type: Boolean, default: true },
  switchNSFW: { type: Boolean, default: false },
  switchWelcome: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  ban: { type: Boolean, default: false },
  name: { type: String },
  addedMods: { type: Boolean, default: false },
});

const CoreSchema = new mongoose.Schema({
  id: { type: String, unique: false, required: true, default: "1" },
  seletedCharacter: { type: String, default: "0" },
  PMchatBot: { type: Boolean, default: false },
  botMode: { type: String, default: "public" },
});

const userData = db1.model("UserData", UserSchema);
const groupData = db1.model("GroupData", GroupSchema);
const systemData = db2.model("SystemData", CoreSchema);

module.exports = { userData, groupData, systemData };
