const apiKey = "AIzaSyCGiv6Jbg4Se5DOdVk4BbAWMkIY0OK6w18";

function search() {
  const query = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("videoContainer");

  if (!query) return;

  container.innerHTML = "<div class='placeholder'>Loading...</div>";

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const { title, thumbnails, channelTitle } = item.snippet;

        const card = document.createElement("div");
        card.className = "video-card";
        card.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnails.medium.url}" alt="${title}" />
            <div class="video-info">
              <div class="video-title">${title}</div>
              <div class="video-channel">${channelTitle}</div>
            </div>
          </a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = "<div class='placeholder'>Error loading videos.</div>";
    });
}