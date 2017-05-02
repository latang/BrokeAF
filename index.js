const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const emoji = require("./emoji");

const jobs = [];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "static")));

// log stuff
app.use(morgan("dev"));

// send the home page
app.get("/", (req, res) => {
    res.render('index', { jobs: jobs })
});

app.get("/website", (req, res) => {
    res.render('website', {
        category: "All Jobs",
        jobs: jobs 
    });
});

app.get("/website/:category", (req, res) => {
    const [first, ...rest] = req.params.category;
    const category = [first.toUpperCase(), ...rest].join("");
    res.render("website", {
        category: category,
        jobs: jobs.filter(job => job.category === category)
    });
});

app.get("/main.css", (req, res) => {
    res.sendFile(path.join(__dirname, "main.css"));
})

app.get("/debug", (req, res) => {
    res.send({ jobs: jobs });
});


// add a job
app.post("/form", (req, res) => {
    console.log(req.body);
    const employer = req.body.employer;
    const title = req.body.title;

    const [first, ...rest] = req.body.category;
    const category = [first.toUpperCase(), ...rest].join("");
    const description = emoji.replace(req.body.description);
    const wage = req.body.wage;
    const contact = req.body.contact;
    const angry = req.body.angry;
    const time = req.body.time;
    const email = req.body.email;
    var website = req.body.website;
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

   if(website.includes("http")){
        website = true
    }
    else{
        website = "https://" + website
    }

    const jobObject = {
        employer: employer,
        title: title,
        category: category,
        description: description, 
        wage: wage,
        contact: contact,
        email: email,
        website: website,
        time: hour + ":" + min + " " + ampm
    }
    jobs.push(jobObject);

    res.redirect("/website");
});

app.listen(process.env.PORT || 8080);
