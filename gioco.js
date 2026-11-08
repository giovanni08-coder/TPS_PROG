

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
const cells = [];
let chipsRemaining = 0;
let score = 0;
let paused = false;
let finished = false;


for(let righe = 0; righe < map.length; righe++) {
  /*
  for(let righe = 0; righe < row.length; righe++) {
    const cell = document.createElement("div");
    cell.className = "cella";

    if (row[colo] === "#") {
      cell.classList.add("muro");
      cell.setAttribute("aria-label", "Muro");
    } else if (tile === ".") {
      cell.classList.add("chip");
      cell.setAttribute("aria-label", "Chip");
      chipsRemaining += 1;
    }

    board.appendChild(cell);
    cells.push(cell);
  });
});*/









document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "p" && !finished) {
    paused = !paused;
    setStatus(
      paused ? "Gioco in pausa. Premi P per riprendere." : "Gioco ripreso.",
      paused ? "caricamento" : "ok",
    );
    return;
  }

  const movement = movements[key];
  if (movement) {
    event.preventDefault();
    movePlayer(...movement);
  }
});
document.body.style.userSelect = "none";
drawPlayer();