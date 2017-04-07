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
    const message = req.body.message;
    const angry = req.body.angry;
    messages.push({username: username, text: message, angry:angry});
    res.redirect("/");
});

app.listen(process.env.PORT || 8080);
