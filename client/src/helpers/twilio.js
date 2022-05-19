const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendTwilio = () => {
  client.messages
    .create({
      body: "This is your generated grocery list!",
      from: process.env.TWILIO_NUMBER,
      to: "+16476695125"
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      console.log(err);
    });
};

export { sendTwilio };
