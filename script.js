
import Timer from "./timer.js";
const clock = document.querySelector(".card > h1");
let time_studying = 0;
let start_time = 0;
let studying = false;
let s = new Date().toLocaleTimeString();
console.log(new Date());

start_time = new Date().getUTCMilliseconds();

clock.textContent = s;