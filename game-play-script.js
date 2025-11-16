window.onload = function() {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  document.getElementById("game-title").textContent = name;

  const gameUrl = params.get("game");
  document.getElementById("game-iframe").src = gameUrl;
}