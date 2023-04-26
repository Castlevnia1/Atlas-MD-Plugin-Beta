const axios = require("axios");

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
    if (response.data && response.data.ban !== true) {
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        {
          id: userID,
          ban: true,
        }
      );
    } else {
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        {
          id: userID,
          ban: true,
        }
      );
    }
  } catch (err) {
    //console.log(err);
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: userID,
      ban: true,
    });
  }
}

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
      return true;
    }
  } catch (err) {
    return false;
  }
}

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
    if (response.data && response.data.ban !== false) {
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        {
          id: userID,
          ban: false,
        }
      );
    } else {
      await axios.put(
        `https://silicondb.32-pratyushprat.repl.co/api/data/${userID}`,
        {
          id: userID,
          ban: false,
        }
      );
    }
  } catch (err) {
    //console.log(err);
    await axios.post("https://silicondb.32-pratyushprat.repl.co/api/data", {
      id: userID,
      ban: false,
    });
  }
}

module.exports = {
  banUser,
  checkBan,
  unbanUser,
};
