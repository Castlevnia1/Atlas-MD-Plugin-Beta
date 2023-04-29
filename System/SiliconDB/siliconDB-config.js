const axios = require("axios");

<<<<<<< Updated upstream
const baseURL = "https://silicondb.32-pratyushprat.repl.co/api/data";

async function updateUserBanStatus(userID, banStatus) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    const userExists = response.status !== 404 && response.data;

    const method = userExists ? axios.put : axios.post;
    await method(`${baseURL}${userExists ? `/${userID}` : ""}`, {
=======
// Ban an user
// Ban an user
async function banUser(userID) {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: userID,
        ban: true,
      });
    }
    if (response.data) {
      const oldData = response.data;
      const newData = { ...oldData, ban: true };
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        newData
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const banUser = (userID) => updateUserBanStatus(userID, true);
const unbanUser = (userID) => updateUserBanStatus(userID, false);

async function checkBan(userID) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    return response.data && response.data.ban === true;
=======
// Check if an user is banned
async function checkBan(userID) {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`
    );
    if (
      response.status == 404 ||
      !response.data ||
      response.data.ban !== true
    ) {
      return false;
    } else {
      if(response.data.ban == true){
        return true;
      }
      else{
        return false;
      }
    }
>>>>>>> Stashed changes
  } catch (err) {
    return false;
  }
}

<<<<<<< Updated upstream
async function updateModStatus(userID, modStatus) {
  try {
    const response = await axios.get(`${baseURL}/${userID}`);
    const userExists = response.status !== 404 && response.data;

    const method = userExists ? axios.put : axios.post;
    await method(`${baseURL}${userExists ? `/${userID}` : ""}`, {
=======
// Unban an user
async function unbanUser(userID) {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: userID,
        ban: false,
      });
    }
    if (response.data) {
      const oldData = response.data;
      const newData = { ...oldData, ban: false };
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        newData
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
>>>>>>> Stashed changes
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

// Adding a Moderator
async function addMod(userID) {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: userID,
        mod: true,
      });
    }
    if (response.data) {
      const oldData = response.data;
      const newData = { ...oldData, mod: true, };
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        newData
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: userID,
      mod: true,
    });
  }
}

// Check if an user is moderator
async function checkMod(userID) {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`
    );
    if (
      response.status == 404 ||
      !response.data ||
      response.data.mod !== true
    ) {
      return false;
    } else {
      if(response.data.mod == true){
        return true;
      }
      else{
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}

// Removing a Moderator
async function delMod(userID) {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: userID,
        mod: false,
      });
    }
    if (response.data) {
      const oldData = response.data;
      const newData = { ...oldData, mod: false, };
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        newData
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: userID,
      mod: false,
    });
  }
}

// Changing the character
async function setChar(charID) {
  try {
    const response = await axios.get(
      "https://silicondb.32-pratyushprat.repl.co/api/data/char"
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: "char",
        charno: charID,
      });
    } else {
      await axios.put(
        "https://silicondb.32-pratyushprat.repl.co/api/data/char",
        {
          id: "char",
          charno: charID,
        }
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: "char",
      charno: charID,
    });
  }
}

// Getting the character
async function getChar() {
  try {
    const response = await axios.get(
      "https://silicondb.32-pratyushprat.repl.co/api/data/char"
    );
    if (
      response.status == 404 ||
      !response.data ||
      response.data.charno == undefined
    ) {
      return 0;
    } else {
      return response.data.charno;
    }
  } catch (err) {
    return 0;
  }
}

// Activating the PM ChatBot
async function activateChatBot() {
  try {
    const response = await axios.get(
      "https://silicondb.32-pratyushprat.repl.co/api/data/pmchatbot"
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: "pmchatbot",
        pmchatbot: true,
      });
    } else {
      await axios.put(
        "https://silicondb.32-pratyushprat.repl.co/api/data/pmchatbot",
        {
          id: "pmchatbot",
          pmchatbot: true,
        }
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: "pmchatbot",
      pmchatbot: true,
    });
  }
}

// Checking the PM ChatBot
async function checkPmChatbot() {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/pmchatbot`
    );
    if (response.status == 404 || !response.data) {
      return false;
    } else {
      if(response.data.pmchatbot == true){
        return true;
      }
      else{
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}
// Deactivating the PM ChatBot
async function deactivateChatBot() {
  try {
    const response = await axios.get(
      `https://silicondb.32-pratyushprat.repl.co/api/data/pmchatbot`
    );
    if (response.status == 404 || !response.data) {
      await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
        id: "pmchatbot",
        pmchatbot: false,
      });
    } else {
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/pmchatbot`,
        {
          id: "pmchatbot",
          pmchatbot: false,
        }
      );
    }
  } catch (err) {
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: "pmchatbot",
      pmchatbot: false,
    });
  }
}

// Exporting the functions
module.exports = {
<<<<<<< Updated upstream
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

=======
  banUser, //----------------------- BAN
  checkBan, // --------------------- CHECK BAN STATUS
  unbanUser, // -------------------- UNBAN
  addMod, // ----------------------- ADD MOD
  checkMod, // --------------------- CHECK MOD STATUS
  delMod, // ----------------------- DEL MOD
  setChar, // ---------------------- SET CHAR ID
  getChar, // ---------------------- GET CHAR ID
  activateChatBot, // -------------- ACTIVATE PM CHATBOT
  checkPmChatbot, // --------------- CHECK PM CHATBOT STATUS
  deactivateChatBot, // ------------ DEACTIVATE PM CHATBOT
>>>>>>> Stashed changes
};
