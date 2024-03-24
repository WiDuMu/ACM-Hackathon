"use strict";
// javascript file which bakes a cookie for user, along with starts the intro message if a cookie hasn't been detected yet
import Timer from "./timer.js";
let cookieInterval;
const daysToLive = 1;
const secondsToLive = daysToLive * 24 * 3600;

function getCookie() {
  const timers = document.querySelectorAll("custom-timer");
  let Objects = [];
  timers.forEach(timer => {
    Objects.push(timer.toObject());
  });
  return JSON.stringify({ breakInterval: parseInt(document.querySelector(`input[name="break-interval"]`).value), breakDuration: parseInt(document.querySelector(`input[name="break-duration"]`).value), timers: Objects });
}

function fromCookie(cookie) {
  const main = document.querySelector("main");
  const data = JSON.parse(cookie);
  data.timers.forEach(time => {
    main.appendChild(Timer.fromObject(time));
  });
  if (typeof data.breakInterval == "number" && !isNaN(data.breakInterval) && isFinite(data.breakInterval)) {
    const breakInput = document.querySelector(`input[name="break-interval"]`);
    breakInput.value = data.breakInterval;
    let e = new MouseEvent("input", {
      target: breakInput,
    });
    breakInput.dispatchEvent(e);
  }
  
  if (typeof data.breakDuration == "number" && !isNaN(data.breakDuration) && isFinite(data.breakDuration)) {
    const breakDurationInput = document.querySelector(`input[name="break-duration"]`);
    breakDurationInput.value = data.breakDuration;
    let eb = new MouseEvent("input", {
      target: breakDurationInput,
    });
    breakDurationInput.dispatchEvent(eb);
  }

  console.log(data);
}

function enableCookies() {
  clearInterval(cookieInterval);
  cookieInterval = setInterval(() => {
    document.cookie = `${getCookie()}; SameSite=strict; max-age=${secondsToLive};`
  }, 1000);
  console.log(cookieInterval);
}

// check if we baked a cookie beforehand to 
if (document.cookie === "") {

  // https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript

  const dialog = document.querySelector("#cookie-pop-up");
  dialog.showModal()
  const accept = document.getElementById("accept");
  const reject = document.getElementById("reject");
  accept.addEventListener("click", (() => { enableCookies(); dialog.close(); }));
  reject.addEventListener("click", (() => { dialog.close(); }));



  // we can have it actually do something later, let's just get that to work first
  console.log("this is your first time visiting the website, congrats.")

} else {
  console.log(document.cookie)
  let lastCookie = document.cookie.split(';');
  lastCookie = lastCookie[lastCookie.length - 1].trim();
  setTimeout(() => { fromCookie(lastCookie); enableCookies(); }, 10);

}

[{ "name": "Hello", "accumulatedTime": 1321163, "startTime": 1711265221925 }];[{ "name": "Hello", "accumulatedTime": 1324748, "startTime": 1711307206621, "endTime": 1711307210206 }]