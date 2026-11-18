const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

let monuments = [
    {
        "_id": 1,
        "name": "Lincoln Memorial",
        "img_name": "lincoln-memorial.jpg",
        "img_alt": "Lincoln Memorial at night",
        "section": "start-here",
        "category": "PRESIDENTIAL",
        "filters": [
            "presidential",
            "open24",
            "tickets"
        ],
        "badges": [
            "OPEN 24 HOURS",
            "NO TICKETS",
            "UNDERCROFT: TICKETS REQUIRED"
        ],
        "description": "Go after 9 p.m. — the crowds thin, the chamber is lit, and the walk back down the Mall is the best view in the city.",
        "hours": "24 Hours, 9:30 am - 10 pm",
        "metro": "Foggy Bottom - 20 min walk",
        "time_needed": "20-30 mins",
        "callouts": [
            "New: the Lincoln Memorial Undercroft opened June 25, 2026. This 15,000 square foot exhibit space sits under the memorial among the concrete columns that hold it up, with interactive exhibits on how it was built and what it has meant. It is open 9 a.m. to 9 p.m. from March to October and 9 a.m. to 8 p.m. from November to February.",
            "Undercroft tickets are free and timed, with a $1 service fee if you reserve ahead. Tickets for the day 30 days out are released at 11 a.m. Eastern on recreation.gov. Same-day tickets are handed out at the Korean War Veterans Memorial kiosk starting at 8:45 a.m. You can stay up to 2 hours."
        ],
        "link": {
            "text": "Reserve Undercroft Tickets",
            "url": "https://www.recreation.gov/ticket/facility/10113318"
        }
    },
    {
        "_id": 2,
        "name": "Washington Monument",
        "img_name": "washington-monument.jpg",
        "img_alt": "Washington Monument",
        "section": "start-here",
        "category": "PRESIDENTIAL",
        "filters": [
            "presidential",
            "tickets"
        ],
        "badges": [
            "TICKETS REQUIRED"
        ],
        "description": "Free timed tickets drop at 10 a.m. daily on recreation.gov and are gone in minutes.",
        "hours": "9am - 5pm",
        "metro": "Smithsonian",
        "time_needed": "30-45 mins"
    },
    {
        "_id": 3,
        "name": "Jefferson Memorial",
        "img_name": "jefferson-memorial.jpg",
        "img_alt": "Jefferson Memorial",
        "section": "start-here",
        "category": "PRESIDENTIAL",
        "filters": [
            "presidential",
            "open24"
        ],
        "badges": [
            "OPEN 24 HOURS",
            "NO TICKETS"
        ],
        "description": "The furthest walk of the four, and the only one worth renting a bike for in peak bloom.",
        "hours": "24 hours",
        "metro": "Smithsonian",
        "time_needed": "30-45 mins"
    },
    {
        "_id": 4,
        "name": "World War II Memorial",
        "img_name": "wwii-memorial.jpg",
        "img_alt": "World War II Memorial",
        "section": "start-here",
        "category": "WAR MEMORIAL",
        "filters": [
            "war"
        ],
        "badges": [
            "NO TICKETS"
        ],
        "description": "Sits directly between Lincoln and the Monument, nobody plans for it but you will walk through it.",
        "hours": "9am - 5pm",
        "metro": "Smithsonian",
        "time_needed": "30-45 mins"
    },
    {
        "_id": 5,
        "name": "Martin Luther King, Jr. Memorial",
        "img_name": "mlk-memorial.jpg",
        "img_alt": "Martin Luther King, Jr. Memorial",
        "section": "district",
        "category": "IMPORTANT FIGURES",
        "filters": [
            "open24"
        ],
        "description": "On the Tidal Basin loop between Lincoln and Jefferson.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "20 Mins"
    },
    {
        "_id": 6,
        "name": "Korean War Veterans Memorial",
        "img_name": "korean-war-memorial.jpg",
        "img_alt": "Korean War Veterans Memorial",
        "section": "district",
        "category": "WAR MEMORIAL",
        "filters": [
            "war",
            "open24"
        ],
        "description": "Best in rain or fog — the statues were built for it.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "20 Mins"
    },
    {
        "_id": 7,
        "name": "Vietnam Veterans Memorial",
        "img_name": "vietnam-veterans-memorial.jpg",
        "img_alt": "Vietnam Veterans Memorial",
        "section": "district",
        "category": "WAR MEMORIAL",
        "filters": [
            "war",
            "open24"
        ],
        "description": "Rangers will help you find a name — ask at the kiosk.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "20 Mins"
    },
    {
        "_id": 8,
        "name": "Albert Einstein Memorial",
        "img_name": "einstein-memorial.jpg",
        "img_alt": "Albert Einstein Memorial",
        "section": "district",
        "category": "IMPORTANT FIGURES",
        "filters": [
            "open24"
        ],
        "description": "You're allowed to climb into his lap — the one statue in D.C. you can touch.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "5 Mins"
    },
    {
        "_id": 9,
        "name": "Ulysses S. Grant Memorial",
        "img_name": "grant-memorial.jpg",
        "img_alt": "Ulysses S. Grant Memorial",
        "section": "district",
        "category": "MILITARY",
        "filters": [
            "open24"
        ],
        "description": "Where the loop starts. Largest equestrian statue in the country.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "20 Mins"
    },
    {
        "_id": 10,
        "name": "Franklin D. Roosevelt Memorial",
        "img_name": "fdr-memorial.jpg",
        "img_alt": "Franklin D. Roosevelt Memorial",
        "section": "district",
        "category": "PRESIDENT",
        "filters": [
            "presidential",
            "open24"
        ],
        "description": "Four outdoor rooms; allow more time than you think.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "30-40 Mins"
    },
    {
        "_id": 11,
        "name": "District of Columbia War Memorial",
        "img_name": "dc-war-memorial.jpg",
        "img_alt": "District of Columbia War Memorial",
        "section": "district",
        "category": "WAR MEMORIAL",
        "filters": [
            "war",
            "open24"
        ],
        "description": "Tucked in the trees off the main path; almost always empty.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "5 Mins"
    },
    {
        "_id": 12,
        "name": "Marine Corps War Memorial",
        "img_name": "marine-corps-war-memorial.jpg",
        "img_alt": "Marine Corps War Memorial",
        "section": "district",
        "category": "WAR MEMORIAL",
        "filters": [
            "war",
            "open24"
        ],
        "description": "Off the loop in Arlington — pair it with the cemetery, not the Mall.",
        "hours": "24 Hours",
        "tickets": "No Ticket",
        "time_needed": "10 Mins"
    }
];

//index.html and the images are in the public folder, so the home page of
//the server shows the api requests and the pictures are at /images/<img_name>
app.get("/api/monuments", (req, res) => {
    res.send(monuments);
});

app.post("/api/monuments", upload.single("image"), (req,res) => {
    const reslut = validateMonument(req.body);
    if (reslut.error) {
        console.log("Error. Server side validation failed.");
        res.status(400).send(reslut.error.details[0].message);
        return;
    }

    if (!req.file) {
        res.status(400).send("A photo of the stop is required");
        return;
    }

    const monument = {
        _id: monuments.length + 1,
        name: req.body.name.trim(),
        img_name: req.file.filename,
        img_alt: req.body.name.trim(),
        section: "district",
        category: req.body.category,
        filters: [],
        description: req.body.description.trim(),
        hours: req.body.hours.trim(),
        tickets: req.body.tickets.trim(),
        time_needed: req.body.time_needed.trim()
    };

    monuments.push(monument);
    res.status(200).send(monument);
});

const validateMonument = (monument) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().trim().min(3).max(60).required(),
        category: Joi.string().valid("PRESIDENTIAL", "WAR MEMORIAL", "IMPORTANT FIGURES", "MILITARY").required(),
        description: Joi.string().trim().min(10).max(200).required(),
        hours: Joi.string().trim().min(3).max(40).required(),
        tickets: Joi.string().trim().min(2).max(40).required(),
        time_needed: Joi.string().trim().min(2).max(30).required()
    });
    return schema.validate(monument);
};

//listen for incoming request
//Render picks the port for us, locally it is 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});

