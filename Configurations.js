require("dotenv").config();


let gg = process.env.MODS;
if (!gg) {
  gg = "918101187835";   // You can Change this number //
}


global.owner = gg.split(",");
//global.mongodb = process.env.MONGODB || "mongodb+srv://fantox:xrto71r@cluster0.dnlowts.mongodb.net/?retryWrites=true&w=majority";
global.mongodb = process.env.MONGODB || "mongodb+srv://tuff:tuff@cluster0.fhsvdnc.mongodb.net/test";
global.sessionId = process.env.SESSION_ID || "ok";
global.prefa = process.env.PREFIX || "/";
global.tenorApiKey = process.env.TENOR_API_KEY || "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c";
global.packname = process.env.PACKNAME || `Atlas Bot`;
global.author = process.env.AUTHOR || "by: Team Atlas";
global.port = process.env.PORT || "8000";

module.exports = {
  mongodb: global.mongodb,
};