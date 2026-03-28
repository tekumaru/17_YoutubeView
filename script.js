function getVideoId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function formatDate(date) {
  return date.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
}

async function createList() {
  const list = document.getElementById("list");

  const response = await fetch("list.csv");
  const text = await response.text();

  const lines = text.split("\n");

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    const parts = line.split(",");

    const url = parts[0].replace(/"/g, "");
    const date = parts[1].replace(/"/g, "");
    const title = parts[2].replace(/"/g, "");

    const id = getVideoId(url);
    if (!id) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <a href="${url}" target="_blank">
        <img class="thumb" src="https://img.youtube.com/vi/${id}/0.jpg">
        <div class="card-body">
          <div style="font-weight:bold; margin-bottom:5px;">
            ${title}
          </div>
          <div style="font-size:12px; color:#888;">
            ${formatDate(date)}
          </div>
        </div>
      </a>
    `;

    list.appendChild(card);
  });
}

createList();
