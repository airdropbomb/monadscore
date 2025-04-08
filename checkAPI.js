const axios = require("axios");
const { log } = require("./utils"); // Adjust the path as necessary
const settings = require("./config/config");

const urlChecking = "https://raw.githubusercontent.com/airdropbomb/APIs-checking/refs/heads/main/endpoints.json";

async function checkBaseUrl() {
  console.log("Checking api...".blue);
  if (settings.ADVANCED_ANTI_DETECTION) {
    const result = await getBaseApi(urlChecking);
    if (result.endpoint) {
      log("No change in api!", "success");
      return result;
    }
  } else {
    return {
      endpoint: settings.BASE_URL,
      message:
        "Tools modified by ADBNode (https://t.me/airdropbombnode) To know more information and updates!| Have any issuess, please contact: https://t.me/airdropbombnode",
    };
  }
}

async function getBaseApi(url) {
  try {
    const response = await axios.get(url);
    const content = response.data;
    if (content?.monadscore) {
      return { endpoint: content.monadscore, message: content.copyright };
    } else {
      return {
        endpoint: null,
        message:
          "Tools modified by ADBNode (https://t.me/airdropbombnode) To know more information and updates!| Have any issuess, please contact: https://t.me/airdropbombnode",
      };
    }
  } catch (e) {
    return {
      endpoint: null,
      message:
        "Tools modified by ADBNode (https://t.me/airdropbombnode) To know more information and updates!| Have any issuess, please contact: https://t.me/airdropbombnode",
    };
  }
}

module.exports = { checkBaseUrl };
