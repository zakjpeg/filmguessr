// variables
var still = document.getElementById('still');
var yearSlider = document.getElementById("year__slider");
var guessButton = document.getElementById("guess__button");
var guessTitle = document.getElementById("guesstitle");


// name: Fetch Random Still
// function: Fetches random image from backend, updates frontend elements.
// input: none
// output: none
// effect: randomizes
function fetchRandomStill() {

    fetch("http://localhost:3000/")
    .then(res => res.text())
    .then(imageURL => {
        still.src = imageURL;
        resetAmbience();
    })
    .catch(error => console.error("Error fetching iamge: ", error));

    randomizeYear();

    guessTitle.value = "";

    gameRight.style.display = "flex";
    answerTitle.style.display = "none";
    answerYear.style.display = "none";
    answerScreen.style.display = "none";

}

// name: Generate Splash Text
// function: Uses round score to output random splash text to frontend.
// input: Score category (1-7)
// output: Random quote string from website/jsons/answer_screen_splash.json
async function generateSplashText(i) {
    try {

        console.log("LETS START");
        console.log("PATH:", i);

        const response = await fetch('./website/jsons/answer_screen_splash.json');
        const data = await response.json();

        let quotes = data["splash-text"][i];
        if (!quotes) throw new Error(`No quotes found for category ${i}`);

        let randomKey = Math.floor(Math.random() * Object.keys(quotes).length) + 1;
        return quotes[randomKey];

    } catch (error) {

        console.error('Error loading JSON:', error);
        return "ERROR LOADING...";

    }

}

// name: Check Guess
// function: Sends user input to backend for scoring, reveals answer
// input: User info from title input and year slider
// output: none
// effects: Switches gamestate to answer screen, update frontend elements
function checkGuess() {
    fetch("http://localhost:3000/check-guess", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            year: yearSlider.value,
            title: guessTitle.value
        })
        
    })
    .then(res => res.json())
    .then(data => {

        console.log("TITLE CHECK:", guessTitle.value);

        answerTitle = document.getElementById("answer__title");
        answerYear = document.getElementById("answer__year");
        gameRight = document.getElementById("game__right");
        answerScreen = document.getElementById("answer__screen");
        pointsEarnedValue = document.getElementById("points__earned__value");
        yearDevianceValue = document.getElementById("year__deviance__value");
        pointsComment = document.getElementById("points__comment");
        answerScreenGuessYear = document.getElementById("answer__screen__guess__year");
        answerScreenGuessTitle = document.getElementById("answer__screen__guess__title");

        answerTitle.innerHTML = data.title;
        answerScreenGuessTitle.innerHTML = guessTitle.value.toUpperCase(); 

        answerYear.innerHTML = data.year;    
        answerScreenGuessYear.innerHTML = yearSlider.value;

        pointsEarnedValue.innerHTML = data.score;
        if (data.yearDeviance == 1) {
            yearDevianceValue.innerHTML = "&nbsp;" + data.yearDeviance + " YEAR &nbsp;";
        } else {
            yearDevianceValue.innerHTML = "&nbsp;" + data.yearDeviance + " YEARS &nbsp;";
        }
        
        gameRight.style.display = "none";
        answerTitle.style.display = "flex";
        answerYear.style.display = "flex";
        answerScreen.style.display = "flex";

        console.log(data);
        console.log(data.score);

        if (data.score == 5000) {
            generateSplashText(1).then(quote => pointsComment.innerHTML = quote);
            console.log(1);
        } else if (data.score >= 4500) {
            generateSplashText(2).then(quote => pointsComment.innerHTML = quote);
            console.log(2);
        } else if (data.score >= 4000) {
            generateSplashText(3).then(quote => pointsComment.innerHTML = quote);
            console.log(3);
        } else if (data.score >= 3000) {
            generateSplashText(4).then(quote => pointsComment.innerHTML = quote);
            console.log(4);
        } else if (data.score >= 2000) {
            generateSplashText(5).then(quote => pointsComment.innerHTML = quote);
            console.log(5);
        } else if (data.score >= 500) {
            generateSplashText(6).then(quote => pointsComment.innerHTML = quote);
            console.log(6);
        } else {
            generateSplashText(7).then(quote => pointsComment.innerHTML = quote);
            console.log(7);
        }

        clearInterval(myTimer);
        console.log("time left: ", timeLeft);

    })

    console.log("sent year: ", yearSlider.value);

}


// event listeners

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("year__slider").max = new Date().getFullYear();
})

document.addEventListener('DOMContentLoaded', () => {
    displayTimer();
    startTimer();
    fetchRandomStill();
});

document.getElementById("next__round__button").addEventListener('click', () => {
    resetTimer();
    displayTimer();
    startTimer();
    fetchRandomStill();
});

guessButton.addEventListener('click', () => {
    clearTimer(myTimer);
    checkGuess();
});

