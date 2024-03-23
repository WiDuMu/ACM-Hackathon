
// javascript file which bakes a cookie for user, along with starts the intro message if a cookie hasn't been detected yet

"use strict";
// check if we baked a cookie beforehand to 

let hasUserComeHereBefore = document.cookie;

if (document.cookie === "") {
    // hey triple equals that was that domain hack thing from the other day: 

    https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript



    // we can have it actually do something later, let's just get that to work first
    console.log("this is your first time visiting the website, congrats.")



    document.cookie = "SameSite=strict;"

    const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
    

}

// if not bake on
console.log("appending cookie")
document.cookie = "username=John Doe; SameSite=strict;";

