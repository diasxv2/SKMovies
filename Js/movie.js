import axios from "axios";

const apiKey = "2cc66887";
const id = window.location.search.split("=").pop();
const url = `https://www.omdbapi.com/?apikey=${apikey}&i=${id}`;

const movieDetailsElement = document.getElementById("movie-details");

axios
  .get(url)
  .then((response) => {
    const movie = response.data;
    movieDetailsElement.innerHTML = `
      <h1>${movie.Title}</h1>
      <img src="${movie.Poster}" alt="${movie.Title}">
      <p>${movie.Plot}</p>
      <p>Genre : ${movie.Genre}</p>
      <p>Acteurs : ${movie.Actors}</p>
    `;
  })
  .catch((error) => {
    console.error(error);
  });
