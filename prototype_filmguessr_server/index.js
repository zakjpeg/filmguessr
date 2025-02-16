const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(express.text());


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
    const reqYear = parseInt(req.body, 10);
    console.log("received year: ", reqYear);

    var yearDeviance = Math.abs(reqYear - currentFilm.year);
    var score;
        if (yearDeviance == 0) {
            score = 5000;
        } else if (yearDeviance <= 1) {
            score = 4700;
        } else if (yearDeviance <= 2) {
            score = 4000;
        } else if (yearDeviance <= 3) {
            score = 2500;
        } else if (yearDeviance <= 4) {
            score = 1900;
        } else if (yearDeviance <= 5) {
            score = 1400;
        } else if (yearDeviance <= 6) {
            score = 1100;
        } else if (yearDeviance <= 7) {
            score = 500;
        } else if (yearDeviance <= 9) {
            score = 100;
        } else {
            score = 0;
        }
    console.log("yearDeviance: ", yearDeviance);

    const responseData = {
        score: score,
        yearDeviance: yearDeviance,
        title: currentFilm.title,
        year: currentFilm.year,
        director: currentFilm.director
    };


    res.json(responseData);

})
