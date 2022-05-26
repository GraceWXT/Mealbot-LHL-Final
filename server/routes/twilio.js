const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

router.post("/", (req, res) => {

  // Construct the message from the req.body data
  const aisles = req.body;

  let textMessage = "";
  for (let i = 0; i < 4; i++) {
    const aisleName = aisles[i]["aisle"].toUpperCase();
    textMessage += `\n${aisleName}\n`;

    aisles[i].items.map(item => {
      const ingredient = `-${item.measures.metric.amount} ${item.measures.metric.unit} ${item.name}\n`;
      textMessage += ingredient;
    });
  }

  // Send the message request to Twilio
  client.messages.create({
    to: process.env.USER_PHONE_NUMBER,
    from: process.env.TWILIO_NUMBER,
    body: textMessage
  })
    .then((message) =>{
      console.log("message.sid: ", message.sid);
      res.status(200).send(message.sid);
    })
    .catch((error) => {
      console.log("Twilio client create message error: ", error.message);
    });

});

module.exports = router;
