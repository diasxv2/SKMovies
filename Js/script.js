import axios from "axios";

const apiKey = "2cc66887";
const url = `https://www.omdbapi.com/?apikey=${apikey}&s=transformers`;

const filmsElement = document.getElementById("films");
const loadMoreButton = document.getElementById("load-more");

axios
  .get(url)
  .then((response) => {
    const films = response.data.Search;
    films.forEach((film) => {
      const filmElement = document.createElement("div");
      filmElement.innerHTML = `
        <img src="${film.Poster}" alt="${film.Title}">
        <h2>${film.Title}</h2>
        <a href="movie.html?id=${film.imdbID}">En savoir plus</a>
      `;
      filmsElement.appendChild(filmElement);
    });
  })
  .catch((error) => {
    console.error(error);
  });

loadMoreButton.addEventListener("click", () => {});
