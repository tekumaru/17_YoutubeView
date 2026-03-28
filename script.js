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

    const col = document.createElement("div");

    // レスポンシブ設定
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

    col.innerHTML = `
      <a href="${url}" target="_blank">
        <div class="thumb-wrapper">
          <img class="thumb" src="https://img.youtube.com/vi/${id}/maxresdefault.jpg">
        </div>
        <div class="mt-2">
          <div class="title">${title}</div>
          <div class="meta">${formatDate(date)}</div>
        </div>
      </a>
    `;

    list.appendChild(col);
  });
}

createList();
