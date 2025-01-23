document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "2cc66887"; // Ta clé API
  const movieDetailsContainer = document.getElementById("movieDetails");
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("id"); // Récupérer l'ID du film depuis l'URL

  if (!imdbID) {
    movieDetailsContainer.innerHTML = "<p>Film non trouvé.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      movieDetailsContainer.innerHTML = `
        <img src="${
          data.Poster !== "N/A" ? data.Poster : "placeholder.jpg"
        }" alt="${data.Title}">
        <h3>${data.Title}</h3>
        <p><strong>Genre :</strong> ${data.Genre}</p>
        <p><strong>Résumé :</strong> ${data.Plot}</p>
        <p><strong>Acteurs :</strong> ${data.Actors}</p>
        <p><strong>Note :</strong> ${data.imdbRating}</p>
        <p><strong>Date de sortie en DVD :</strong> ${formatDate(
          data.Released
        )}</p>
      `;
    } else {
      movieDetailsContainer.innerHTML = "<p>Détails non disponibles.</p>";
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du film :",
      error
    );
    movieDetailsContainer.innerHTML = "<p>Erreur de connexion.</p>";
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
