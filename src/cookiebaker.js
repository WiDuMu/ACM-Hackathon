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
  return JSON.stringify(Objects);
}

function fromCookie(cookie) {
  const main = document.querySelector("main");
  const data = JSON.parse(cookie);
  data.forEach(time => {
    main.appendChild(Timer.fromObject(time));
  });
  console.log(data);
}

function enableCookies() {
  clearInterval(cookieInterval);
  cookieInterval = setInterval(() => {
    document.cookie = `${getCookie()}; SameSite=strict; max-age=${secondsToLive};`
  }, 10000);
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
  fromCookie(document.cookie);
  enableCookies();
}

