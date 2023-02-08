const express = require("express")
const app = new express();
const port = process.env.PORT || 4000;
require('dotenv').config({ path: __dirname + '/.env' })
const csv = require('csvtojson/v2');
const sendEmail = require('./sendEmails');
let csvToJson = require('convert-csv-to-json');
const validator = require('validator')
const data = []

async function checkEmail(email) {
    return validator.isEmail(email)
}

async function getEmails() {
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv("src/email.csv")
    for (let i = 0; i < json.length; i++) {
        if (checkEmail(json[i]['email'])) {
            console.log(json[i]['email'])
            data.push(json[i]['email'])
        }
    }
}

async function SendEmails(email) {
    await sendEmail({ email: email, subject: 'test', message: 'Hello this is a test message' });
}







app.get('/', async (req, res) => {

    await getEmails();
    data.forEach(async (ele) => {
        await SendEmails(ele)
    })
    console.log(data)
    res.send('Done ya raya2')
})


const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
