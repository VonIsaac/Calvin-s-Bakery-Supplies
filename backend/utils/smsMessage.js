const axios = require('axios');

async function sendSmsMessage(message, phoneNumbers) {
  const apiUrl = "http://192.168.1.56:8080/message";

  try {
    const response = await axios.post(
      apiUrl,
      { message, phoneNumbers },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from("sms:gATRGffk").toString("base64"),
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error sending SMS:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { sendSmsMessage };