//Imports to make the API-call work
import { resultsContainer } from "../script.js";
import { favouritesContainer } from "../script.js";
import { message } from "../script.js";
import { url } from "../script.js";
import { getExistingFavs } from "./favFunctions.js";
import { handleClick } from "./favFunctions.js";
import { getFavs } from "./favourites.js";

// import { getLibrary } from "./library.js";

//Call the API to get all the movies
export async function getMovies() {
  try {
    const favourites = getExistingFavs();

    const response = await fetch(url);
    const json = await response.json();

    resultsContainer.innerHTML = "";
    // favouritesContainer.innerHTML = "";

    const movies = json;
    console.log({ movies });

    movies.forEach(function (movie) {
      let cssClass = "far";

      const doesObjectExist = favourites.find(function (fav) {
        return fav.id === movie.id;
      });

      if (doesObjectExist) {
        cssClass = "fa";
      }

      resultsContainer.innerHTML += `<div class="movie">
                                      <i class="${cssClass} fa-heart" data-id="${movie.id}" data-name="${movie.name}" data-cover="${movie.images[0].src}"></i>
                                        <a href ="../pages/movie_details2.html?id=${movie.id}"><img src="${movie.images[0].src}" alt="${movie.name}"></a>
                                        </div> `;
    });
    const favButtons = document.querySelectorAll(".movie i");

    favButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });
  } catch (error) {
    resultsContainer.innerHTML = message;
  }

  getFavs();
  // getLibrary();
}

await getMovies();
