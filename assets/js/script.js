const API_URL = "https://script.google.com/macros/s/AKfycbxVcK9-GfN-0teDVZA4jAyZxxR2py3DLwUyLvwvlSuhi0UwnrYuXkBO2_MhLMyPhdUUUQ/exec";

async function fetchNews(limit = 9) {
  try {
    const res = await fetch(`${API_URL}?limit=${limit}`);
    const data = await res.json();
    const container = document.getElementById("news-list");
    if (!container) return;

    container.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${item.image}" alt="">
        <h3><a href="news.html?id=${item.id}">${item.title}</a></h3>
        <p>${item.summary}</p>
        <small>${item.published_at}</small>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading news:", err);
  }
}

function fetchDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  fetch(`${API_URL}?id=${id}`)
    .then(res => res.json())
    .then(item => {
      document.getElementById("news-title").textContent = item.title;
      document.getElementById("news-date").textContent = item.published_at;
      document.getElementById("news-image").src = item.image;
      document.getElementById("news-body").textContent = item.body;
    });
}

if (document.getElementById("news-list")) {
  fetchNews();
}
if (document.getElementById("news-details")) {
  fetchDetails();
}
