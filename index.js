const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const emoji = require("./emoji");

const messages = [];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'pug')

// log stuff
app.use(morgan("dev"));

// send the home page
app.get("/", (req, res) => {
    res.render('index', { messages: messages })
});

app.get("/main.css", (req, res) => {
    res.sendFile(path.join(__dirname, "main.css"));
})

app.get("/debug", (req, res) => {
    res.send({ messages: messages });
});

// add a message
app.post("/form", (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const message = emoji.replace(req.body.message);
    const angry = req.body.angry;
    const time = req.body.time;
    const date = new Date();
    var hour = date.getHours();
    var ampm

    if (hour < 12){
        ampm = "AM"
    }
    else{
        ampm = "PM";
        hour = hour - 12; 
    }

    var min = date.getMinutes();
    if(min < 10){
        min = "0" + min;
    }

    const messageObject = {
        username: username, 
        text: message, 
        angry: angry, 
        time: hour + ":" + min + " " + ampm
    }
    messages.push(messageObject);

    res.redirect("/");
});

app.listen(process.env.PORT || 8080);
