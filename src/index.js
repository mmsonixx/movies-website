import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { movies, renderMovies } from "./js/movie-list.js";
import { filterByGenre } from "./js/filter.js";
import { searchMovies } from "./js/search.js";
import { sortMovies } from "./js/sort.js";
import { updateClock } from "./js/clock.js";

const clock = document.querySelector("[data-clock]");

updateClock(clock);

setInterval(() => {
  updateClock(clock);
}, 1000);


// ===============================
// MOVIES
// ===============================

const moviesContainer = document.querySelector("[data-movies]");
const search = document.querySelector("[data-search]");

let currentMovies = [...movies];

renderMovies(currentMovies, moviesContainer);


// ===============================
// GENRE SELECT
// ===============================

const genreSelect = document.querySelector(".select");
const selectedButton = document.querySelector(".selected");
const selectedText = document.querySelector(".selected-text");
const genreOptions = document.querySelectorAll(".option");


selectedButton.addEventListener("click", event => {
  event.stopPropagation();

  genreSelect.classList.toggle("open");
});


genreOptions.forEach(option => {

  option.addEventListener("click", event => {

    event.stopPropagation();

    const genre = option.dataset.ganre;

    selectedText.textContent = option.textContent;

    genreSelect.classList.remove("open");


    if (genre === "all") {

      currentMovies = [...movies];

      renderMovies(currentMovies, moviesContainer);

      return;
    }


    currentMovies = filterByGenre(genre, movies);

    renderMovies(currentMovies, moviesContainer);

  });

});


document.addEventListener("click", event => {

  if (!genreSelect.contains(event.target)) {

    genreSelect.classList.remove("open");

  }

});


// ===============================
// SORT SELECT
// ===============================

const sortSelect = document.querySelector(".sort-select");
const sortSelected = document.querySelector(".sort-selected");
const sortSelectedText = document.querySelector(".sort-selected-text");
const sortOptions = document.querySelectorAll(".sort-option");


sortSelected.addEventListener("click", event => {

  event.stopPropagation();

  sortSelect.classList.toggle("open");

});


sortOptions.forEach(option => {

  option.addEventListener("click", event => {

    event.stopPropagation();

    const sortType = option.dataset.sort;

    sortSelectedText.textContent = option.textContent;

    sortSelect.classList.remove("open");


    currentMovies = sortMovies(
      sortType,
      currentMovies
    );

    renderMovies(
      currentMovies,
      moviesContainer
    );

  });

});


document.addEventListener("click", event => {

  if (!sortSelect.contains(event.target)) {

    sortSelect.classList.remove("open");

  }

});


// ===============================
// SEARCH
// ===============================

function handleSearch(event) {

  const query = event.target.value
    .trim()
    .toLowerCase();


  if (!query) {

    renderMovies(
      currentMovies,
      moviesContainer
    );

    return;
  }


  const searchedFilms = searchMovies(
    query,
    currentMovies
  );


  renderMovies(
    searchedFilms,
    moviesContainer
  );

}


search.addEventListener(
  "input",
  handleSearch
);


// ===============================
// TRAILER MODAL
// ===============================

const modal = document.querySelector("[data-modal]");
const video = document.querySelector("[data-video]");
const closeModalButtons =
  document.querySelectorAll("[data-close-modal]");


moviesContainer.addEventListener("click", event => {

  const button =
    event.target.closest(".trailer-button");


  if (!button) return;


  const trailerUrl =
    button.dataset.trailer;


  console.log("Видео:", trailerUrl);


  // Загружаем видео
  video.src = trailerUrl;

  video.load();


  // Открываем наше модальное окно
  modal.classList.add("is-open");

  document.body.classList.add("modal-open");


  // Запускаем видео
  video.play().catch(error => {

    console.log(
      "Автозапуск заблокирован:",
      error
    );

  });

});


// ===============================
// CLOSE MODAL
// ===============================

closeModalButtons.forEach(button => {

  button.addEventListener(
    "click",
    closeModal
  );

});


function closeModal() {

  modal.classList.remove("is-open");

  document.body.classList.remove(
    "modal-open"
  );


  // Останавливаем видео
  video.pause();

  video.removeAttribute("src");

  video.load();

}


// ===============================
// ESCAPE
// ===============================

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeModal();

  }

});


// ===============================
// SIMPLE LIGHTBOX
// ДЛЯ КАРТИНОК
// ===============================

// Если у тебя картинки имеют, например:
// <a href="big-image.jpg">
//   <img src="small-image.jpg">
// </a>

const lightbox = new SimpleLightbox(
  ".gallery a",
  {
    captions: true,
    captionDelay: 250,
  }
);


// ===============================
// THEME
// ===============================

const themeToggle =
  document.querySelector("#theme-toggle");


const savedTheme =
  localStorage.getItem("theme");


if (savedTheme === "light") {

  document.body.classList.add(
    "light-theme"
  );

  themeToggle.checked = true;

}


themeToggle.addEventListener(
  "change",
  () => {

    if (themeToggle.checked) {

      document.body.classList.add(
        "light-theme"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    } else {

      document.body.classList.remove(
        "light-theme"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    }

  }
);


const form = document.querySelector("#user-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const ageInput = document.querySelector("#age");



const savedData = localStorage.getItem("userData");

if (savedData) {
  const userData = JSON.parse(savedData);

  nameInput.value = userData.name;
  emailInput.value = userData.email;
  ageInput.value = userData.age;
}



form.addEventListener("submit", event => {
  event.preventDefault();

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value,
  };

  localStorage.setItem(
    "userData",
    JSON.stringify(userData)
  );

});

