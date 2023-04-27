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

async function setUserBankWallet(userID, bank, wallet) {
  try {
    await axios.post(`${baseURL}`, {
      id: userID,
      bank: bank,
      wallet: wallet,
    });
  } catch (err) {
    console.error(err);
  }
}

async function getUserBankWallet(userID) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    if (response.status === 404 || !response.data) {
      return null;
    }
    return {
      bank: response.data.bank,
      wallet: response.data.wallet,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateUserBankWallet(userID, bank, wallet) {
  try {
    await axios.put(`${baseURL}/${userID}`, {
      bank: bank,
      wallet: wallet,
    });
  } catch (err) {
    console.error(err);
  }
}

async function getUser(userID) {
  const userBankWallet = await getUserBankWallet(userID);

  if (!userBankWallet) {
    // Set the user's bank and wallet balance to 0 if they are not in the database.
    await setUserBankWallet(userID, 0, 0);
    return { wallet: 0, bank: 0 };
  }

  return { wallet: userBankWallet.wallet, bank: userBankWallet.bank };
}

async function setGold(userID, amount, field = "wallet") {
  try {
    const userBankWallet = await getUserBankWallet(userID);

    if (!userBankWallet) {
      // Set the user's bank and wallet balance to 0 if they are not in the database.
      await setUserBankWallet(userID, 0, 0);
    }

    let newBankValue = userBankWallet.bank;
    let newWalletValue = userBankWallet.wallet;

    if (field === "bank") {
      newBankValue += amount;
    } else if (field === "wallet") {
      newWalletValue += amount;
    } else {
      throw new Error("Invalid field specified for setGold function.");
    }

    await updateUserBankWallet(userID, newBankValue, newWalletValue);
  } catch (err) {
    console.error(err);
  }
}

async function getLastDailyClaim(userID) {
  try {
    const response = await axios.get(`${baseURL}/daily/${userID}`);
    if (response.status === 404 || !response.data) {
      return null;
    }
    return response.data.lastClaim;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateLastDailyClaim(userID, timestamp) {
  try {
    await axios.put(`${baseURL}/daily/${userID}`, {
      lastClaim: timestamp,
    });
  } catch (err) {
    console.error(err);
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
  getUser,
  setGold,
  getLastDailyClaim,
  updateLastDailyClaim,

};
