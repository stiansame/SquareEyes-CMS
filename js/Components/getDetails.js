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

const Url2 =
  "https://stianrostad.no/wordpress/wp-json/wc/store/products/" + movieId;

export async function getDetails() {
  try {
    const response = await fetch(Url2);
    const json = await response.json();
    const details = json;

    createDetails(details);
    checkForDetails(details);
    storeDetail(details);
    // applyFilter(details);
  } catch (error) {
    resultsContainer.innerHTML = message;
    document.title = "Nope! Didn't catch that...";
  }
}

getDetails();

function createDetails(details) {
  const categories = details.categories;
  const categoryString = categories.map((cat) => cat.name).join(" | ");
  console.log({ categoryString });

  posterContainer.innerHTML = `<div class="posterDetails">
   <img class="posterImg" src="${details.images[0].src}" alt ="${details.images[0].alt}">
   </div>`;

  document.title = `${details.name} | Details`;

  resultsContainer.innerHTML = `<div class="heading_1"> ${details.name}
   </div>
    <div class="meta">
    <p>Genre: ${categoryString} </p> Released: ${
    details.attributes[1].terms[0].name
  }
     |  Rating: ${details.attributes[0].terms[0].name}
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
  const onSale = details.on_sale;
  let newPrice;
  if (!onSale) {
    newPrice = details.prices.regular_price;
  } else {
    newPrice = details.prices.price;
  }
  return newPrice;
}

function onSale(details) {
  const onDiscount = details.on_sale;

  let discount;
  if (!onDiscount) {
    discount = "";
  } else {
    discount =
      "<div class='discount'><i class='fa-solid fa-certificate'></i><span>On Sale!</span></div>" +
      "<span class='regPrice'> Ord. price: Kr " +
      details.prices.regular_price;
    +"</span";
  }
  return discount;
}

/* function displayNames(array) {
  // Loop through each element in the array
  for (let i = 0; i < array.length; i++) {
    // Access the name property and display it
    console.log(array[i].name);
  }
} */

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

/* async function applyFilter(details) {
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
} */
