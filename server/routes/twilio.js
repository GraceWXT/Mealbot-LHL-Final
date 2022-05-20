const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(accountSid, authToken);


router.post("/", (req, res) => {
  const groceryList = req.body;

  console.log('req.body', req.body);

  let textMessage = "";

  for (let i = 0; i < 5; i++){
    const aisle = groceryList[i].aisle.toUpperCase();

    textMessage += `\n${aisle}\n`;

    groceryList[i].items.map(item => {
      const ingredient = `-${item.measures.original.amount} ${item.measures.original.unit} ${item.name}\n`;
      textMessage += ingredient;
    });

  }

  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_NUMBER,
    body: textMessage
  })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));


    return res.status(200);

});

module.exports = router;


