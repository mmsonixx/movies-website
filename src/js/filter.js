export function filterByGenre (genre,movies)  {
    const filteredMovies = movies.filter((element) => { return element.genre.includes(genre) });
    return filteredMovies;
}