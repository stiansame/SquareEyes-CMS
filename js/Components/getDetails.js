//Get the movie details

//imports
import { createMessage } from "../Components/Message.js";
import { url } from "../script.js";
import { reviewUrl } from "../script.js";

const posterContainer = document.querySelector(".poster");

const SuggestionContainer = document.querySelector(".byGenre");
export const reviewContainer = document.querySelector(".review-container");
const genreContainer = document.querySelector(".genreTags");

export const resultsContainer = document.querySelector(
  ".description-container"
);
const message = createMessage();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const movieId = params.get("id");

// Categories to filter on (using slugs)
const filter = [];
const rFilter = [];

export const Url2 =
  "https://stianrostad.no/wordpress/wp-json/wc/store/products/" + movieId;

export async function getDetails() {
  try {
    const response = await fetch(Url2);
    const json = await response.json();
    const details = json;

    rFilter.push(details.id);

    const reviewResponse = await fetch(reviewUrl);
    const reviewJson = await reviewResponse.json();
    const allReviews = reviewJson;

    createDetails(details);
    checkForDetails(details);
    storeDetail(details);
    renderFilter(details);
    getReviews(allReviews);
    filterMovies();
  } catch (error) {
    resultsContainer.innerHTML = message;
    document.title = "Nope! Didn't catch that...";
  }
}

getDetails();

function createDetails(details) {
  const categories = details.categories;
  const categoryString = categories.map((cat) => cat.name).join(" | ");

  posterContainer.innerHTML = `<div class="posterDetails">
   <img class="posterImg" src="${details.images[0].src}" alt ="${details.images[0].alt}">
   </div>`;

  document.title = `${details.name} | Details`;

  resultsContainer.innerHTML = `<div class="heading_1"> ${details.name}
   </div>
    <div class="meta">
    <p>Genre: ${categoryString} </p> Released: ${
    details.attributes[0].terms[0].name
  }
     |  Rating: ${details.average_rating}
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

  genreContainer.innerHTML = "&nbsp" + categoryString + ":";
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

//render Filter
async function renderFilter(movie) {
  const category = movie.categories;

  for (let i = 0; i < category.length; i++) {
    filter.push(category[i].slug);
  }
}

//get suggestions

async function filterMovies() {
  const response = await fetch(url);
  const data = await response.json();
  const movies = data;

  // Function to filter movies based on categories
  function filterMoviesByCategories(moviesArray, categorySlugs) {
    return moviesArray.filter((movie) =>
      movie.categories.some((category) => categorySlugs.includes(category.slug))
    );
  }
  const filteredMovies = filterMoviesByCategories(movies, filter);

  //Empty Suggestions
  SuggestionContainer.innerHTML = "";

  filteredMovies.forEach((movie) => {
    SuggestionContainer.innerHTML += `<div class="movie">
                           <a href ="/pages/movie_details2.html?id=${movie.id}">
                           <img src="${movie.images[0].src}" alt="${movie.name}">
                           </a>
                            </div>`;
  });
}

//REVIEWS

export function getReviews(allReviews) {
  function filterByID(reviewFilter) {
    return allReviews.filter((review) => review.product_id === reviewFilter);
  }

  const reviewFilter = parseInt(rFilter);
  const filteredReviews = filterByID(reviewFilter);

  function getLastThreeReviews(reviews) {
    const sortedReviews = reviews.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );

    // Get the last three reviews
    return sortedReviews.slice(0, 3);
  }

  const data = filteredReviews;
  const lastThreeReviews = getLastThreeReviews(data);
  console.log({ lastThreeReviews });
  //Empty reviews
  if (filteredReviews < 1) {
    reviewContainer.innerHTML = "<p>...No reviews yet :(</p>";
  } else {
    reviewContainer.innerHTML = "";
  }
  lastThreeReviews.forEach((review) => {
    reviewContainer.innerHTML += `<div class="review">
                                  <img class="rev_img" src="${review.product_image.src}">
                                      <div class="rating"> <p>Rating: ${review.rating}</p></div>
                                      <div class="by_user"><p> reviewed by: <b>${review.reviewer}</b></p></div>
                                      <div class="desc">${review.review}</div>
                                      <div class="read-btn">
                                      <input type="checkbox" name="${review.id}" id="${review.id}" class="review_btn">
                                      </div>
                                      </div>`;
  });
}
