"use strict"

import Timer from "./timer.js";

const activities = [];
let breakInterval = 1800000;
let unit = 60;

const intervalInput = document.querySelector(`input[name="break-interval"]`);
intervalInput.value = 30;
const unitInput = document.querySelector(`input[value="minutes"]`);
const unitInput2 = document.querySelector(`input[value="hours"]`);
unitInput.checked = true;
changeUnit();
const addButton = document.getElementById("plus");
const grid = document.body.querySelector("main");

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
   const timespent2 = Date.now() - Timer.firstStartTime;
   console.log(timespent2, breakInterval, Date.now());
   if (Timer.running > 0) {
      const timespent = Date.now() - Timer.firstStartTime;
      if (timespent > breakInterval) {
         
         touchGrass();
      }
   }
}

function killAllTimers() {
   const timers = document.querySelectorAll("custom-timer");
   timers.forEach(timer => {
      timer.turnOff();
   })
}

function touchGrass() {
   const grassDialog = document.querySelector("#go-touch-grass");
   grassDialog.showModal();
   const acceptGrassButton = grassDialog.querySelector("#accept-break");
   acceptGrassButton.addEventListener("click", () => {killAllTimers();});
}

// Start checking the time running
setInterval(checkTime, 500);
