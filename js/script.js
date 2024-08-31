//Imports Here!
import { createMessage } from "./Components/Message.js";
import { initialize } from "./Components/app.js";

//URL for API-call
export const url = "https://v2.api.noroff.dev/square-eyes";

//Define DIV to display API-call results
export const resultsContainer = document.querySelector(".movie-carousel");
export const favouritesContainer = document.querySelector(".favourites");

//Display message
export const message = createMessage();

initialize();

//Accordion
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
