const axios = require("axios");

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
      id: userID,
      ban: true,
    });
  }
}

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
  } catch (err) {
    return false;
  }
}

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
      id: userID,
      ban: false,
    });
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
};
