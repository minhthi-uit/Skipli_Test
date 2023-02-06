import express from "express";
import { db } from "../firebase.js";
import twilio from 'twilio';
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import dotenv from "dotenv";

const authRoute = express.Router();

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function CreateNewAccessCode(phoneNumber) {
  const sixDigit = Math.floor(100000 + Math.random() * 900000)
  //save code to db with phone number
  await setDoc(doc(db, "phones", `${phoneNumber}`), {
    accessCode: sixDigit,
  });
  //send sms 
  client.messages
  .create({ body: `Access code is ${sixDigit}`, from: "+14353835375", to: `+84${phoneNumber}` })
  .then(message => console.log(message.sid)) 
  .done();
}

authRoute.post('/send-code', async (req, res) => {
  try {
    const accessCode = req.body.code
    const phoneNumber = req.body.phoneNumber
    var msg
    //user did not submit a code
    console.log(`code generated for ${phoneNumber} is ${await CreateNewAccessCode(phoneNumber)}`)
    msg = `A verification code was sent to ${phoneNumber}`
    res.send(JSON.stringify({ 
        message: msg
    }))
} catch (error) {
    res.status(400).send(error.message);
}
});

async function ValidateAccessCode(accessCode, phoneNumber) {
  var isValidate;
  console.log(`validating ${phoneNumber}, ${accessCode}`)
  //retrieve access code from database
  const querySnapshot = await getDocs(collection(db, "phones"));
  querySnapshot.forEach((doc) => {
    if(doc.id === phoneNumber ){
      console.log(doc.data().accessCode)
      if(doc.data().accessCode == accessCode ){
        isValidate = true;
      }
    }
});
  if (isValidate) {
    await setDoc(doc(db, "phones", `${phoneNumber}`), {
      accessCode: '',
    });
  }
  return isValidate
}

authRoute.post("/validate-code", async (req, res) => {
    const accessCode = req.body.accessCode
    const phoneNumber = req.body.phoneNumber
    // check access code
    await ValidateAccessCode(accessCode, phoneNumber)

});

export { authRoute };