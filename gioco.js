
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

const player = [ 1, 1]; // Coordinate iniziali del giocatore (x, y)];
let chipsRemaining = 0;
let punteggio =0;
const punteggioElemento = document.getElementById("punteggio");
const celleVuote = [];
const grigliaDiv = [];

function trovaCella(x, y) {
  for (let i = 0; i < grigliaDiv.length; i++) {
    if (grigliaDiv[i][1] === y && grigliaDiv[i][2] === x) {
      return grigliaDiv[i]; // Restituisce tutto [div, y, x]
    }
  }
  return null; // Nessuna cella trovata 
}

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
function SpawnaMonete(){
  for (let i = 0; i < 40; i++) {
  const indiceAcaso = Math.floor(Math.random() * celleVuote.length);
  const coordinata = celleVuote.splice(indiceAcaso, 1)[0];
  
  let Cella = null;
  Cella = trovaCella(coordinata[1], coordinata[0]); /*coordinata[1] è x, coordinata[0] è y */
  
  if (Cella !== null) {
    const cellaTarget = Cella[0];/*cella[0] è il div corrispondente */
    const imgCoin = document.createElement("img");
    imgCoin.src = "sprite_gioco/coin.png";
    cellaTarget.appendChild(imgCoin);
    chipsRemaining += 1;
  }
}
}
SpawnaMonete();



//Movimento del giocatore
function muoviGiocatore(x, y) {
  const nuovaX = player[0] + x;
  const nuovaY = player[1] + y;

  if (map[nuovaY][nuovaX] !== "#") {
    
    
    const cellaVecchia = trovaCella(player[0], player[1]);
    const imgRobot = cellaVecchia[0].querySelector("img"); 
    if (imgRobot) {
      cellaVecchia[0].removeChild(imgRobot); 
    }

    player[0] = nuovaX;
    player[1] = nuovaY;

    const cellaNuova = trovaCella(player[0], player[1]);

    const imgCoin = cellaNuova[0].querySelector("img");
    if (imgCoin!==null && imgCoin.src.includes("coin.png")) {
      cellaNuova[0].removeChild(imgCoin);
      punteggio +=1;
      punteggioElemento.textContent = punteggio;
      chipsRemaining -= 1;
      if(chipsRemaining===0){
        SpawnaMonete();
      }
    }

    const nuovoImgRobot = document.createElement("img");
    nuovoImgRobot.src = "sprite_gioco/robot.png";
    cellaNuova[0].appendChild(nuovoImgRobot); 
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    muoviGiocatore(1, 0);
    }
  if (event.key === "ArrowLeft") {
    muoviGiocatore(-1, 0);
  }
  if (event.key === "ArrowUp") {
    muoviGiocatore(0, -1);
  }
  if (event.key === "ArrowDown") {
    muoviGiocatore(0, 1);
  }
});



TornaAlSito.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "schermata_iniziale.html";
    statoSito.textContent = "Caricamento del gioco in corso...";
    statoSito.classList.add("caricamento");
  });
});
document.body.style.userSelect = "none";
