
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

const mostri = [
  {"src": "sprite_gioco/virus-rosso.png", "x": 11, "y": 1}, 
  {"src": "sprite_gioco/virus-viola.png", "x": 11, "y": 11},
  {"src": "sprite_gioco/virus-verde.png", "x": 1, "y": 11},
  {"src": "sprite_gioco/virus-arancio.png", "x": 11, "y": 5}
];

const player = { x: 1, y: 1 };
let chipsRemaining = 0;
const celleVuote = [];
const grigliaDiv = [];

for (let righe = 0; righe < map.length; righe++) {
  for (let parola = 0; parola < map[righe].length; parola++) {
    const cell = document.createElement("div");
    cell.className = "cella";
    const img = document.createElement("img");

    grigliaDiv.push([cell, righe, parola]);

    let mostroTrovato = null;

    for (let i = 0; i < mostri.length; i++) {
      if (mostri[i].x === parola && mostri[i].y === righe) {
        mostroTrovato = mostri[i];
        break;
      }
    }

    if (mostroTrovato !== null) {
      img.src = mostroTrovato.src;
      cell.appendChild(img);
    } 
    else if (map[righe][parola] === "#") {
      img.src = "sprite_gioco/muro.png";
      cell.appendChild(img);
    } 
    else if (map[righe][parola] === "P") {
      img.src = "sprite_gioco/robot.png";
      cell.appendChild(img);
    } 
    else {
      celleVuote.push([righe, parola]);
    }

    board.appendChild(cell);
  }
}

for (let i = 0; i < 40; i++) {
  const indiceAcaso = Math.floor(Math.random() * celleVuote.length);
  const coordinata = celleVuote.splice(indiceAcaso, 1)[0];
  
  let arrayCellaTarget = null;
  for (let j = 0; j < grigliaDiv.length; j++) {
    if (grigliaDiv[j][1] === coordinata[0] && grigliaDiv[j][2] === coordinata[1]) {
      arrayCellaTarget = grigliaDiv[j];
      break;
    }
  }
  
  if (arrayCellaTarget) {
    const cellaTarget = arrayCellaTarget[0];
    const imgCoin = document.createElement("img");
    imgCoin.src = "sprite_gioco/coin.png";
    cellaTarget.appendChild(imgCoin);
    chipsRemaining += 1;
  }
}




TornaAlSito.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "schermata_iniziale.html";
    statoSito.textContent = "Caricamento del gioco in corso...";
    statoSito.classList.add("caricamento");
  });
});
document.body.style.userSelect = "none";
