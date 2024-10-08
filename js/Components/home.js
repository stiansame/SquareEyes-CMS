import { url5 } from "../script2.js";
import { url } from "../script.js";
import { reviewUrl } from "../script.js";

const featuredContainer = document.querySelector(".featured_content");
const comFav = document.querySelector(".comFav");
const lastReviewsContainer = document.querySelector(".review-box");

// Your API credentials
const username = "ck_00e515882b7ce6e5c59d7f70b3faaec08a6a6ad4";
const password = "cs_08a3f368b1c9d0ad8a4db6b85b944256188afab0";

// Create the base64 encoded credentials
const credentials = btoa(`${username}:${password}`);

// Set up the request headers
const headers = new Headers();
headers.append("Authorization", "Basic " + credentials);

async function getAllMovies() {
  const response = await fetch(url5, {
    method: "GET",
    headers: headers,
  });
  const json = await response.json();
  const movies = json;
  console.log({ movies });
  const reviewResponse = await fetch(reviewUrl);
  const reviewJson = await reviewResponse.json();
  const allReviews = reviewJson;

  getFeatured(movies);
  getApiFav(movies);
  lastReviews(allReviews);
}

getAllMovies();

export function getFeatured(movies) {
  //   Fisher-Yates Sorting Algorithm
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  featuredContainer.innerHTML = "";

  const myArray = movies;
  const shuffledArray = shuffle(myArray);

  for (let i = 0; i < shuffledArray.length; i++) {
    featuredContainer.innerHTML += `<div class="feature" style="background-image:url(${shuffledArray[i].images[0].src})">
                                        
                                        <div class="feature-content">
                                        <div class="heading_1"><h3>${shuffledArray[i].name}</h3></div>
                                        <div class="rating"> Rating: ${shuffledArray[i].average_rating}</div>
                                        <div class="desc"><p> ${shuffledArray[i].short_description}</p></div>
                                        <div class="cta_button">
                                        <a href="/pages/movie_details2.html?id=${shuffledArray[i].id}"> Read More!</a>
                                        </div>
                                        </div>
                                        </div>`;

    if (i === 2) {
      break;
    }
  }
}

//Display by API favourite
function getApiFav(movies) {
  //Empty Community Favourites
  comFav.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    if (!movies[i].featured) {
      continue;
    }
    comFav.innerHTML += `<div class="movie">
                           <a href ="/pages/movie_details2.html?id=${movies[i].id}">
                           <img src="${movies[i].images[0].src}" alt="${movies[i].name}">
                           </a>
                            </div>`;
  }
}

//LAST REVIEWS

function lastReviews(allReviews) {
  function getLastThreeReviews(reviews) {
    const sortedReviews = reviews.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );

    // Get the last three reviews
    return sortedReviews.slice(0, 3);
  }

  const data = allReviews;
  const lastThreeReviews = getLastThreeReviews(data);

  lastThreeReviews.forEach((review) => {
    lastReviewsContainer.innerHTML += `<div class="review">
                                  <a href ="/pages/movie_details2.html?id=${review.product_id}">
                                  <img class="rev_img" src="${review.product_image.src}">
                                  </a>
                                      <div class="rating"> <p>Rating: ${review.rating}</p></div>
                                      <div class="by_user"><p> reviewed by: <b>${review.reviewer}</b></p></div>
                                      <div class="desc">${review.review}</div>
                                      <div class="read-btn">
                                      <input type="checkbox" name="${review.id}" id="${review.id}" class="review_btn">
                                      </div>
                                      </div>`;
  });
}
