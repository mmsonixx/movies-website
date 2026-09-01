import movie from '../templates/movie.json';
import makeListMovie from '../templates/movie.hbs';

export function renderMovies(movies, container) {
  const filmsList = makeListMovie({ movie: movies });

  container.innerHTML = filmsList;
}

export { movie as movies };