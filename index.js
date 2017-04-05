const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const messages = [];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// log stuff
app.use(morgan("dev"));

// send the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const getMessageOutput = messages => {
    return messages.map(function (message) {
        return message.username + ":" + message.message;
    }).join("<br />");
}

// add a message
app.post("/form", (req, res) => {
    const username = req.body.username;
    const message = req.body.message;
    messages.push({username: username, message: message});

    const out = getMessageOutput(messages);
    res.send(out);
});

// get messages
app.get("/messages", (req, res) => {
    const out = getMessageOutput(messages);
    res.send(out);
});

app.listen(process.env.PORT || 8080);
