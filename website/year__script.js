


    var yearSlider = document.getElementById("year__slider");
    var yearDisplay = document.getElementById("year__display");
    yearSlider.value = (Math.random() * 75 + 1950);
    yearDisplay.innerHTML = yearSlider.value;

    yearSlider.oninput = function() {
        var yearValue = yearSlider.value;
        yearDisplay.innerHTML = yearValue;
    }

    var yearIncrement = document.getElementById("year__increment");
    var yearDecrement = document.getElementById("year__decrement");

    yearIncrement.addEventListener('click', function() {
        yearSlider.value++;
        yearDisplay.innerHTML = yearSlider.value;
    })

    yearDecrement.addEventListener('click', function() {
        yearSlider.value--;
        yearDisplay.innerHTML = yearSlider.value;
    })