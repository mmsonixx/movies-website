export const searchMovies = (query, movies) => {
    const filterMovies = movies.filter(
      (element) =>
        element.title.toLowerCase().includes(query) ||
        element.description.toLowerCase().includes(query)
    );
    return filterMovies;
};