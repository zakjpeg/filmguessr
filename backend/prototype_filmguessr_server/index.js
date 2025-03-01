const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const levenshtein = require('fast-levenshtein');


app.use(cors());
app.use(express.json());


let filmList;
let currentFilm;

const data = fs.readFileSync("./films.json", "utf8");
filmList = JSON.parse(data);


app.get('/', (req, res) => {
    if (!filmList || !filmList.movies) {
        return res.status(500).send("Film data not loaded");
    }

    currentFilm = filmList.movies[Math.floor(Math.random() * filmList.movies.length)];
    let randomStill = currentFilm.screenshots[Math.floor(Math.random() * currentFilm.screenshots.length)];

    res.send(randomStill);

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

app.put('/check-guess', (req, res) => {
    const reqYear = req.body.year;
    const reqTitle = req.body.title.trim().toLowerCase();
    const trueTitle = currentFilm.title.trim().toLowerCase();
    console.log("received year: ", reqYear);
    console.log("received title: ", reqTitle);

    var yearDeviance = Math.abs(reqYear - currentFilm.year);
    var score = 0;
    if (yearDeviance == 0) {
        score += 2500;
    } else if (yearDeviance <= 1) {
        score += 2350;
    } else if (yearDeviance <= 2) {
        score += 2000;
    } else if (yearDeviance <= 3) {
        score += 1250;
    } else if (yearDeviance <= 4) {
        score += 950;
    } else if (yearDeviance <= 5) {
        score += 700;
    } else if (yearDeviance <= 6) {
        score += 550;
    } else if (yearDeviance <= 7) {
        score += 250;
    } else if (yearDeviance <= 9) {
        score += 50;
    } else {
        score = 0;
    }
    console.log("yearDeviance: ", yearDeviance);


    console.log("Entered Title:", reqTitle.toUpperCase(), "Real Title:", currentFilm.title.toUpperCase());
    const distance = levenshtein.get(reqTitle, trueTitle);
    const maxLen = Math.max(reqTitle.length, trueTitle.length);
    const similarity = 1 - distance / maxLen;

    console.log("Similarity: ", similarity);

    if (similarity >= 0.9) {
        score += 2500;
    } else if (similarity >= 0.8) {
        score += 2350;
    } else {
        score += Math.floor(similarity * 2500 * 0.8);
    }

    const responseData = {
        score: score,
        yearDeviance: yearDeviance,
        title: currentFilm.title,
        year: currentFilm.year,
        director: currentFilm.director
    };


    res.json(responseData);

})
