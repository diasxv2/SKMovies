document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "2cc66887";
  const moviesContainer = document.querySelector(".movies-container");
  let currentPage = 1;
  let isLoading = false;

  async function fetchMovies(page) {
    if (isLoading) return;
    isLoading = true;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=Movie&page=${page}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Search) {
        data.Search.forEach((movie) => {
          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");

          movieCard.innerHTML = `
                        <img src="${
                          movie.Poster !== "N/A"
                            ? movie.Poster
                            : "placeholder.jpg"
                        }" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <a href="movie.html?id=${
                          movie.imdbID
                        }">En savoir plus</a>
                    `;

          moviesContainer.appendChild(movieCard);
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    } finally {
      isLoading = false;
    }
  }

  fetchMovies(currentPage);

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading
    ) {
      currentPage++;
      fetchMovies(currentPage);
    }
  });
});
