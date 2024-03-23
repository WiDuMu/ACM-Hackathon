"use strict";
import CookieDialog from "./dialog.js";
// javascript file which bakes a cookie for user, along with starts the intro message if a cookie hasn't been detected yet

let cookieInterval;
const daysToLive = 1;
const secondsToLive = daysToLive * 24 * 3600;

function enableCookies() {
  clearInterval(cookieInterval);
  cookieInterval = setInterval(() => {
    document.cookie = `; SameSite=strict; max-age=${secondsToLive};`
  }, 30000);
}

// check if we baked a cookie beforehand to 
if (document.cookie === "") {
    // hey triple equals that was that domain hack thing from the other day: 

    // https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript

    let dialog = new CookieDialog();
    document.body.prepend(dialog);
    let accept = dialog.shadow.querySelector("#accept");
    accept.addEventListener('click', enableCookies);



    // we can have it actually do something later, let's just get that to work first
    console.log("this is your first time visiting the website, congrats.")

}

