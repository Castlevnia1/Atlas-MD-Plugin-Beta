const mongoose = require("mongoose");
const config = require("../../Configurations.js");
const options = {
<<<<<<< HEAD
  socketTimeoutMS: 30000,
};

// ----------------------- Atlas can work with upto 4 MongoDB databases at once to distribute DB load  -------------------- //

const db1 = mongoose.createConnection(config.mongodb, options); // You malually put first mongodb url here
const db2 = mongoose.createConnection(config.mongodb, options); // You malually put second mongodb url here
=======
  socketTimeoutMS: 30000, 
};

const db1 = mongoose.createConnection(config.mongodb, options);
const db2 = mongoose.createConnection(config.mongodb, options);
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c

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

const PluginSchema = new mongoose.Schema({
<<<<<<< HEAD
  plugin: { type: String },
  url: { type: String },
});
=======
    plugin: { type: String },
    url: { type: String },
  });
>>>>>>> 1cbf3fa642e55c58afe5b4f44b8b2f6b0771373c

const userData = db1.model("UserData", UserSchema);
const groupData = db1.model("GroupData", GroupSchema);
const systemData = db2.model("SystemData", CoreSchema);
const pluginData = db2.model("PluginData", PluginSchema);

module.exports = { userData, groupData, systemData, pluginData };
