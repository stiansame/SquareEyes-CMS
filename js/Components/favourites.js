import { getExistingFavs } from "./favFunctions.js";
import { favouritesContainer } from "../script.js";
// import { libraryContainer } from "../script.js";
import { handleClick } from "./favFunctions.js";

export function getFavs() {
  const favourites = getExistingFavs();

  favouritesContainer.innerHTML = "";

  favourites.forEach((favourite) => {
    favouritesContainer.innerHTML += `<div class="movie">
                                        <i class="fa fa-heart" data-id="${favourite.id}" data-name="${favourite.name}" data-cover="${favourite.cover}"></i>
                                        <a href ="../pages/movie_details2.html?id=${favourite.id}"><img src="${favourite.cover}" alt="${favourite.name}"></a>
                                        </div>`;
  });

  const favButtons = document.querySelectorAll(".movie i");
  favButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
}
