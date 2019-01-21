require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const client = require("twilio")(process.env.SID, process.env.AUTH);

app.post("/api/send", function (req, res) {
    console.log(req.body);
    client.messages.create({
        body: 'Hello',
        from: process.env.NUMBER,
        to: "+14804402748"
    }).then(message => {
        res.send(message);
    })
})

app.post("/api/getMessage", function (req, res) {
    const twiml = new MessagingResponse();

    // if (req.body.Body === "Hello there") {
    //     twiml.message("Hi!!");
    // }
    // else {
    //     twiml.message("I got nothing to say to that for now.");
    // }

    // res.writeHead(200, { 'Content-Type': 'text/xml' });
    // res.end(twiml.toString());

    client.messages.create({
        body: "Someone sent you a message: " + req.body.From + "\nThere message was: " + req.body.Body,
        from: process.env.NUMBER,
        to: "+14804402748"
    });
})

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
});