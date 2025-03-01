// variables
var timeAlotted = 120;
var timeLeft = timeAlotted;
var myTimer

// name: Display Timer
// function: Reveals timer on frontend
// input: none
// output: none
function displayTimer() {
    document.getElementById("timer").style.display = 'flex';
    document.getElementById("timer__minute").innerHTML = parseInt((timeLeft / 60), 10);
    document.getElementById("timer__second").innerHTML = `${(timeLeft % 60)}`.padStart(2, '0');
}


// name: Start Timer
// function: Begins timer and decrements value every second.
//      also animates ambient background once timer goes under 15 seconds.
// input: none
// output: none
function startTimer() {
    myTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").style.display = 'flex';
        document.getElementById("timer__minute").innerHTML = parseInt((timeLeft / 60), 10);
        document.getElementById("timer__second").innerHTML = `${(timeLeft % 60)}`.padStart(2, '0');

        if (timeLeft <= 15) {
            document.getElementById("still__ambience").animate([
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ], {
                duration: 2000
            });
        }

        if (timeLeft == 0 || timeLeft < 0) {
            clearTimer(myTimer);
            checkGuess();
        }
    }, 1000);

}

// name: Clear Timer
// function: Stops timer and removes timer from frontend display
// input: Your timer object
// output: none
function clearTimer(a) {
    clearInterval(a);
    document.getElementById("timer").style.display = 'none';
}


// name: Reset Timer
// function: Resets timer length to allotted time
// input: none
// output: none
function resetTimer() {
    timeLeft = timeAlotted;
}

