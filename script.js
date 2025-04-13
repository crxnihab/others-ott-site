function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    body.style.backgroundColor = "#111";
    body.style.color = "#fff";
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    body.style.backgroundColor = "#f9f9f9";
    body.style.color = "#111";
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

function closeJoinPopup() {
  document.getElementById("join-popup").style.display = "none";
}

function closeMoviePopup() {
  document.getElementById("movie-popup").style.display = "none";
}

const trendingMovies = [
  "Inception", "The Matrix", "Interstellar", "The Dark Knight", "Tenet", "Avatar", "Gladiator"
];

const latestMovies = [
  "Dune", "Oppenheimer", "John Wick 4", "The Marvels", "Jawan", "Salaar", "Leo"
];

const apiKey = "7597b42a";

async function fetchMovies(movieList, containerId) {
  const container = document.getElementById(containerId);

  for (const title of movieList) {
    try {
      const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
      const data = await res.json();

      if (data.Response === "True") {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/160x240?text=No+Image"}" alt="${data.Title}">
          <div class="movie-title">${data.Title}</div>
          <div class="movie-year">Year: ${data.Year}</div>
          <div class="movie-rating">IMDb: ${data.imdbRating}</div>
        `;

        slide.onclick = () => showMoviePopup(data);
        container.appendChild(slide);
      }
    } catch (err) {
      console.error("Error loading movie:", title, err);
    }
  }

  new Swiper(`#${containerId === "training-movie-list" ? "trending-swiper" : "latest-swiper"}`, {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    }
  });
}

function showMoviePopup(data) {
  const popup = document.getElementById("movie-popup");
  const content = document.getElementById("movie-popup-content");

  content.innerHTML = `
    <span class="movie-popup-close" onclick="closeMoviePopup()">×</span>
    <h3>${data.Title}</h3>
    <p><strong>Year:</strong> ${data.Year}</p>
    <p><strong>Released:</strong> ${data.Released}</p>
    <p><strong>Runtime:</strong> ${data.Runtime}</p>
    <p><strong>Genre:</strong> ${data.Genre}</p>
    <p><strong>Director:</strong> ${data.Director}</p>
    <p><strong>Writer:</strong> ${data.Writer}</p>
    <p><strong>Actors:</strong> ${data.Actors}</p>
    <p style="margin-top: 10px;">To watch this movie, open our Telegram channel and search by name.</p>
    <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank" class="popup-btn">View More</a>
  `;

  popup.style.display = "flex";
}

window.onload = () => {
  fetchMovies(trendingMovies, "training-movie-list");
  fetchMovies(latestMovies, "latest-movie-list");

  if (!localStorage.getItem("joinShown")) {
    document.getElementById("join-popup").style.display = "flex";
    localStorage.setItem("joinShown", "true");
  }
};
