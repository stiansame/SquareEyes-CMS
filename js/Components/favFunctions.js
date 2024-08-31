import { getFavs } from "./favourites.js";
import { getMovies } from "./getmovies.js";
// import { getLibrary } from "./library.js";

export function getExistingFavs() {
  const favs = localStorage.getItem("favourites");

  if (!favs) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}

export function handleClick() {
  this.classList.toggle("far");
  this.classList.toggle("fa");

  const id = this.dataset.id;
  const name = this.dataset.name;
  const cover = this.dataset.cover;

  const currentFavs = getExistingFavs();

  const favItemExists = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (!favItemExists) {
    const favItem = { id: id, name: name, cover: cover };
    currentFavs.push(favItem);
    saveFavs(currentFavs);
  } else {
    const newFavs = currentFavs.filter((fav) => fav.id !== id);
    saveFavs(newFavs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
  getFavs();
  getMovies();
  // getLibrary();
}
