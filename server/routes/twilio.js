const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(accountSid, authToken);


router.post("/", (req, res) => {
  const groceryList = req.body;

  let textMessage = "";

  //FILTER OUT
  const filter = ["Oil, Vinegar, Salad Dressing", "Spices and Seasonings", "Condiments", "Pantry Items", "Sweet Snacks", "Dried Fruits", "Ethnic Foods", "Generic", "Savory Snacks", "Nut butters, Jams, and Honey", "Alcoholic Beverages"];

  for (let i = 0; i < 3; i++) {
    if (!filter.includes(groceryList[i].aisle)) {
      const aisle = groceryList[i].aisle.toUpperCase();

      textMessage += `\n${aisle}\n`;

      groceryList[i].items.map(item => {
        const ingredient = `-${item.measures.metric.amount} ${item.measures.metric.unit} ${item.name}\n`;
        textMessage += ingredient;
      });
    }
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


