"use strict"

import Timer from "./timer.js";

let breakInterval = 1800000;
let unit = 60;
let breakLength = 20;
let breakLengthMilliseconds = breakLength * unit * 1000;
let breakTime = 0;
let breakTimeInterval = 0;

const intervalInput = document.querySelector(`input[name="break-interval"]`);
intervalInput.value = 30;
const unitInput = document.querySelector(`input[value="minutes"]`);
const unitInput2 = document.querySelector(`input[value="hours"]`);
const progressBar = document.getElementById("progress");
const finalTimer = document.querySelector(".final-time");
unitInput.checked = true;
changeUnit();
const addButton = document.getElementById("plus");
const grid = document.body.querySelector("main");
const checkGrassInterval = setInterval(checkTime, 100);

// array storing the memeable quotes
const memeableTouchGrassQuotes = [
   
   "take a break. go touch some grass.",
   "the grass is greener on the other side, not this side. go on and touch some grass.",
   "grass doesn't hurt to touch, you know. give it a try.",
   "i can assure you that grass will feel better than that keyboard you've been typing away at. go touch some.",
   "toca un poquito de césped, por favor. (touch grass please.)",
   "literaly the only thing stopping you from touching grass is (mabye?) a lawnmower. go touch some already.",
   
];

addButton.addEventListener("click", () => {
   grid.appendChild(new Timer());
});

function changeInterval() {
   const input = intervalInput.value;
   const duration = parseFloat(input);
   if ( !isNaN(duration) && isFinite(duration) && duration >= 0 ) {
      console.log(duration);
      breakInterval = (duration * unit) * 1000;
   } else {
      intervalInput.value = Math.floor(breakInterval / (unit * 1000));
   }
}
intervalInput.addEventListener("input", changeInterval);
intervalInput.addEventListener("change", changeInterval);

function changeUnit() {
   const unitString = document.querySelector(`input[name=units]:checked`).value;
   
   if (unitString === "minutes") {
      unit = 60;
   } else if (unitString === "hours") {
      //intervalInput.value = (parseInt(intervalInput) / 60);
      unit = 3600;
   } else {
      //console.log("How does this even happen?");
      unitInput.checked = true;
   }
   changeInterval();
   //console.log("changing unit: "+unit+" String: "+unitString+" current timeout: "+breakInterval);
}
unitInput.addEventListener("input", changeUnit);
unitInput2.addEventListener("input", changeUnit);

// how long has the person been working
// throw a break trigger if is 
function checkTime() {
   const now = Date.now();
   const timespent = now - Timer.firstStartTime;
   // console.log(timespent, breakInterval, Date.now());
   if (Timer.running > 0) {
      if (breakInterval > 0) {
         progressBar.value = timespent / breakInterval * 100;
      } else {
         progressBar.value = 0;
      }
      
      if (timespent > breakInterval) {
         breakTime = now;
         touchGrass();
      }
   }
}

function killAllTimers() {
   const timers = document.querySelectorAll("custom-timer");
   timers.forEach(timer => {
      timer.turnOff();
      console.log(JSON.stringify(timer));
   })
}

function updateOvertime() {
   const timespent = Date.now() - Timer.firstStartTime;
   finalTimer.textContent = Timer.formatTime(timespent);
}

function updateBreakTime() {
   const timeLeft = (breakTime + breakLengthMilliseconds) - Date.now();
   finalTimer.textContent = Timer.formatTime(timeLeft);
}

function touchGrass() {
   const grassDialog = document.querySelector("#go-touch-grass");
   const quote = document.querySelector("#go-touch-grass > div > h1 > q");
   clearInterval(checkGrassInterval);
   quote.textContent = getRandomPhrase();
   grassDialog.showModal();
   const acceptGrassButton = grassDialog.querySelector("#accept-break");
   const finalInterval = setInterval(updateOvertime, 500);
   acceptGrassButton.addEventListener("click", () => {
      clearInterval(finalInterval);
      breakTimeInterval = setInterval(updateBreakTime);
      killAllTimers();
   });
}

// return a random string from the array with random quotes
function getRandomPhrase() { return memeableTouchGrassQuotes[ Math.floor(Math.random() * memeableTouchGrassQuotes.length) ]; };


// Start checking the time running

