const apiKey = "2cc66887";

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  if (query === "") return;

  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      document.getElementById("movieList").innerHTML =
        "<p>Aucun film trouvé.</p>";
    }
  } catch (error) {
    console.error("Erreur lors de la recherche des films:", error);
  }
}

function displayMovies(movies) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
      <img src="${
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/200x300"
      }" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>(${movie.Year})</p>
      <a href="movie.html?id=${
        movie.imdbID
      }" class="btn-more">En Savoir plus</a>
    `;

    movieList.appendChild(movieElement);
  });
}
