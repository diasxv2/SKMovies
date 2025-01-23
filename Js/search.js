import axios from "axios";

const apiKey = "2cc66887";
const searchInput = document.getElementById("search-input");
const searchResultsElement = document.getElementById("search-results");
const loadMoreResultsButton = document.getElementById("load-more-results");

searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value;
  const url = `https://www.omdbapi.com/?apikey=${apikey}&s=${searchQuery}`;

  axios
    .get(url)
    .then((response) => {
      const searchResults = response.data.Search;
      searchResultsElement.innerHTML = "";
      searchResults.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.innerHTML = `
          <img src="${result.Poster}" alt="${result.Title}">
          <h2>${result.Title}</h2>
          <a href="movie.html?id=${result.imdbID}">En savoir plus</a>
        `;
        searchResultsElement.appendChild(resultElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

loadMoreResultsButton.addEventListener("click", () => {});
