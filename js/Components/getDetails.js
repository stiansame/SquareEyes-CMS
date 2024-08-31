//Get the movie details

//imports
import { createMessage } from "../Components/Message.js";
import { url } from "../script.js";

const posterContainer = document.querySelector(".poster");

const SuggestionContainer = document.querySelector(".byGenre");

export const resultsContainer = document.querySelector(
  ".description-container"
);
const message = createMessage();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const movieId = params.get("id");

const Url2 = "https://v2.api.noroff.dev/square-eyes/" + movieId;

export async function getDetails() {
  try {
    const response = await fetch(Url2);
    const json = await response.json();
    const details = json.data;

    createDetails(details);
    checkForDetails(details);
    storeDetail(details);
    applyFilter(details);
  } catch (error) {
    resultsContainer.innerHTML = message;
    document.title = "Nope! Didn't catch that...";
  }
}

getDetails();

function createDetails(details) {
  posterContainer.innerHTML = `<div class="posterDetails">
   <img class="posterImg" src="${details.image.url}" alt ="${details.image.alt}">
   </div>`;

  document.title = `${details.title} | Details`;

  resultsContainer.innerHTML = `<div class="heading_1"> ${details.title}
   </div>
    <div class="meta">
    Genre: ${details.genre} | Released: ${details.released}
     |  Rating: ${details.rating}
    </div>
   <div class="desc">
    <p><B>Description:</b></p><p>${details.description}</p>
    </div> 
    <div class="desc" id="pricing">
    <p><b>Price:</b> Kr ${price(details)} ${onSale(details)}</p></div>
    <div class="desc" data-id="${details.id}">
    <div class="cta_button PushToCart">
    Add to cart</div>
    </div>`;
}

function price(details) {
  const onSale = details.onSale;
  let newPrice;
  if (!onSale) {
    newPrice = details.price;
  } else {
    newPrice = details.discountedPrice;
  }
  return newPrice;
}

function onSale(details) {
  const onDiscount = details.onSale;

  let discount;
  if (!onDiscount) {
    discount = "";
  } else {
    discount =
      "<div class='discount'><i class='fa-solid fa-certificate'></i><span>On Sale!</span></div>" +
      "<span class='regPrice'> Ord. price: Kr " +
      details.price;
    +"</span";
  }
  return discount;
}

//Set details to SessionStorage
function storeDetail(sessionDetails) {
  sessionStorage.setItem("movieDetails", JSON.stringify(sessionDetails));
}

//Check SessionStoreage
export function checkForDetails() {
  const sessionDetails = sessionStorage.getItem("movieDetails");
  if (!sessionDetails) {
    return [];
  } else {
    return JSON.parse(sessionDetails);
  }
}

//get suggestions

async function applyFilter(details) {
  const filter = details.genre;
  const response = await fetch(url);
  const json = await response.json();
  const movies = json.data;
  console.log(movies);
  console.log(filter);

  const filteredMovies = movies.filter(filterMovies);

  function filterMovies(movie) {
    if (movie.genre === filter) {
      return true;
    }
  }
  console.log(filteredMovies);

  //Empty Suggestions
  SuggestionContainer.innerHTML = "";

  filteredMovies.forEach((movie) => {
    SuggestionContainer.innerHTML += `<div class="movie">
                           <a href ="/pages/movie_details2.html?id=${movie.id}">
                           <img src="${movie.image.url}" alt="${movie.title}">
                           </a>
                            </div>`;
  });
}
