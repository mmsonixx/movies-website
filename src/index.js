import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { movies, renderMovies } from "./js/movie-list.js";
import { filterByGenre } from "./js/filter.js";
import { searchMovies } from "./js/search.js";
import { sortMovies } from "./js/sort.js";

const moviesContainer = document.querySelector("[data-movies]");
const search = document.querySelector("[data-search]");


let currentMovies = [...movies];
renderMovies(currentMovies, moviesContainer);



const genreSelect = document.querySelector(".select");
const selectedButton = document.querySelector(".selected");
const selectedText = document.querySelector(".selected-text");
const genreOptions = document.querySelectorAll(".option");

const sortSelect = document.querySelector(".sort-select");
const sortSelected = document.querySelector(".sort-selected");
const sortSelectedText = document.querySelector(".sort-selected-text");
const sortOptions = document.querySelectorAll(".sort-option");



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


function handleSearch(event) {

  const query = event.target.value
    .trim()
    .toLowerCase();

  if (!query) {

    renderMovies(currentMovies, moviesContainer);

    return;
  }


  const searchedFilms = searchMovies(query, currentMovies);

  renderMovies(searchedFilms, moviesContainer);

}

search.addEventListener("input", handleSearch);




const modal = document.querySelector("[data-modal]");
const video = document.querySelector("[data-video]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

let lightbox = null;

moviesContainer.addEventListener("click", event => {
  const button = event.target.closest(".trailer-button");

  if (!button) return;

  const trailerUrl = button.dataset.trailer;

  console.log("Видео:", trailerUrl);

  // Создаем ссылку для SimpleLightbox
  const galleryLink = document.createElement("a");

  galleryLink.href = trailerUrl;
  galleryLink.classList.add("lightbox-video-link");

  document.body.appendChild(galleryLink);

  // Создаем SimpleLightbox
  lightbox = new SimpleLightbox(".lightbox-video-link", {
    captions: false,
    nav: false,
    close: true,
    showCounter: false
  });

  // Открываем SimpleLightbox
  lightbox.open();

  // Показываем наше видео
  video.src = trailerUrl;
  video.load();

  modal.classList.add("is-open");
  document.body.classList.add("modal-open");

  video.play().catch(error => {
    console.log("Автозапуск заблокирован:", error);
  });
});


closeModalButtons.forEach(button => {
  button.addEventListener("click", closeModal);
});


function closeModal() {
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  video.pause();
  video.removeAttribute("src");
  video.load();

  // Закрываем SimpleLightbox
  if (lightbox) {
    lightbox.close();
    lightbox.destroy();
    lightbox = null;
  }

  // Удаляем временную ссылку
  const galleryLink = document.querySelector(".lightbox-video-link");

  if (galleryLink) {
    galleryLink.remove();
  }
}


document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
  }
});


const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

function observeMovieCards() {
  const movieItems = document.querySelectorAll(".movie_item");

  movieItems.forEach(item => {
    observer.observe(item);
  });
}

observeMovieCards();