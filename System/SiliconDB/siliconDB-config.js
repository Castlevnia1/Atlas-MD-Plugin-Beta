const axios = require("axios");

const baseURL = "https://silicondb.32-pratyushprat.repl.co/api/data";

async function updateUserBanStatus(userID, banStatus) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    const userExists = response.status !== 404 && response.data;

    const method = userExists ? axios.put : axios.post;
    await method(`${baseURL}${userExists ? `/${userID}` : ""}`, {
      id: userID,
      ban: banStatus,
    });
  } catch (err) {
    await axios.post(baseURL, {
      id: userID,
      ban: banStatus,
    });
  }
}

const banUser = (userID) => updateUserBanStatus(userID, true);
const unbanUser = (userID) => updateUserBanStatus(userID, false);

async function checkBan(userID) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    return response.data && response.data.ban === true;
  } catch (err) {
    return false;
  }
}

async function updateModStatus(userID, modStatus) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    const userExists = response.status !== 404 && response.data;

    const method = userExists ? axios.put : axios.post;
    await method(`${baseURL}${userExists ? `/${userID}` : ""}`, {
      id: userID,
      mod: modStatus,
    });
  } catch (err) {
    await axios.post(baseURL, {
      id: userID,
      mod: modStatus,
    });
  }
}

const setMod = (userID) => updateModStatus(userID, true);
const removeMod = (userID) => updateModStatus(userID, false);

async function checkMod(userID) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    return response.data && response.data.mod === true;
  } catch (err) {
    return false;
  }
}

async function fetchMods() {
  try {
    const response = await axios.get(`${baseURL}`);
    const users = response.data;
    const mods = users.filter(user => user.mod === true).map(user => user.id);
    return mods;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchBannedUsers() {
  try {
    const response = await axios.get(`${baseURL}`);
    const users = response.data;
    const bannedUsers = users.filter(user => user.ban === true).map(user => user.id);
    return bannedUsers;
  } catch (err) {
    console.error(err);
    return [];
  }
}


module.exports = {
  banUser,
  checkBan,
  unbanUser,
  setMod,
  removeMod,
  checkMod,
  fetchMods,
  fetchBannedUsers,
};
