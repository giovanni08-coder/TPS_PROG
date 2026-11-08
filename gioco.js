
const TornaAlSito = document.querySelectorAll(".btn");
const board = document.getElementById("tabellone");

const map = [
  "###############",
  "#P....#.......#",
  "#.##..#..##...#",
  "#.....#.......#",
  "###.#...#.#####",
  "#...#.#.#.....#",
  "#.....#.......#",
  "#.###...###...#",
  "#.....#.......#",
  "#.#.#...#.#...#",
  "#...#...#.....#",
  "#.............#",
  "###############",
];

const player = { x: 1, y: 1 };
let chipsRemaining = 0;


for(let righe = 0; righe < map.length; righe++) {
  for(let parola = 0; parola < map[righe].length; parola++) {
    if (map[righe][parola] === "#") {
      const cell = document.createElement("div");
      const ImmagineMuro = document.createElement("img");
      ImmagineMuro.src = "sprite_gioco/muro.png";
      cell.className = "cella";
      cell.appendChild(ImmagineMuro);
      board.appendChild(cell);
    }   
    if (map[righe][parola] === ".") {
      const cell = document.createElement("div");
      const ImmagineChip = document.createElement("img");
      ImmagineChip.src = "sprite_gioco/coin.png";
      cell.className = "cella";
      cell.appendChild(ImmagineChip);
      board.appendChild(cell);
      chipsRemaining += 1;
    }
    if (map[righe][parola] === "P") {
      const cell = document.createElement("div");
      const ImmaginePlayer = document.createElement("img");
      ImmaginePlayer.src = "sprite_gioco/robot.png";
      cell.className = "cella";
      cell.appendChild(ImmaginePlayer);
      board.appendChild(cell);
    }
}};



TornaAlSito.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "schermata_iniziale.html";
    statoSito.textContent = "Caricamento del gioco in corso...";
    statoSito.classList.add("caricamento");
  });
});
document.body.style.userSelect = "none";
