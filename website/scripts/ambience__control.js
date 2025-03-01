// variables
var stillAmbience = document.getElementById('still__ambience');

// name: Reset Ambience
// function: Updates ambient background to current Still Image. 
// input: none
// output: none
function resetAmbience() {
    stillAmbience.src = still.src
}

// On page load, update the ambient background
still.addEventListener('DOMContentLoaded', resetAmbience());
