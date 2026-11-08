
const TornaAlSito = document.querySelector("#torna-sito");
const board = document.getElementById("tabellone");
const Gioca = document.querySelector("#gioca");
const statoSito = document.querySelector("#stato-gioco");
statoSito.textContent = "Caricamento del gioco in corso...";
statoSito.classList.add("caricamento");


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
let MoneteRimanenti = 0;
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
function SpawnaMonete() {
  // 1. Ripopoliamo l'array celleVuote scansionando tutta la mappa
  celleVuote.length = 0; // Svuotiamo l'array esistente

  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      // Se non è un muro (#), consideriamo la cella potenzialmente vuota
      if (map[r][c] !== "#") {
        // Controlliamo che non ci sia il giocatore
        let occupata = false;
        if (player[0] === c && player[1] === r) {
          occupata = true;
        }
        
        // Controlliamo che non ci sia un mostro
        for (let i = 0; i < mostri.length; i++) {
          if (mostri[i].x === c && mostri[i].y === r) {
            occupata = true;
            break;
          }
        }

        // Se la cella è libera da giocatore e mostri, la aggiungiamo alle celle vuote
        if (!occupata) {
          celleVuote.push([r, c]); // [righe, parola] -> [y, x]
        }
      }
    }
  }

  // 2. Ora peschiamo in sicurezza le 40 monete
  MoneteRimanenti = 0; // Reset contatore

  for (let i = 0; i < 40; i++) {
    const indiceAcaso = Math.floor(Math.random() * celleVuote.length);
    const coordinata = celleVuote.splice(indiceAcaso, 1)[0];
    
    let Cella = trovaCella(coordinata[1], coordinata[0]); /* coordinata[1] è x, coordinata[0] è y */
    
    if (Cella !== null) {
      const cellaTarget = Cella[0]; /* cella[0] è il div corrispondente */
      const imgCoin = document.createElement("img");
      imgCoin.src = "sprite_gioco/coin.png";
      cellaTarget.appendChild(imgCoin);
      MoneteRimanenti += 1;
    }
  }
}
SpawnaMonete();


Gioca.addEventListener("click", () => {
  document.querySelector("#gioca").disabled = true;
  statoSito.textContent = "Gioco in corso...";
  statoSito.classList.remove("caricamento");
  statoSito.classList.add("ok");
function muoviGiocatore(x, y) {
  const nuovaX = player[0] + x;
  const nuovaY = player[1] + y;

  if (map[nuovaY][nuovaX] !== "#") {
    let colpitoMostro = false;
    for (let i = 0; i < mostri.length; i++) {
      if (mostri[i].x === nuovaX && mostri[i].y === nuovaY) {
        colpitoMostro = true;
        break;
      }
    }

    const cellaVecchia = trovaCella(player[0], player[1]);
    const imgRobot = cellaVecchia[0].querySelector("img"); 
    if (imgRobot) {
      cellaVecchia[0].removeChild(imgRobot); 
    }

    player[0] = nuovaX;
    player[1] = nuovaY;

    const cellaNuova = trovaCella(player[0], player[1]);

    if (colpitoMostro) {
      alert("Game Over! Un mostro ti ha preso!");
      location.reload();
      return;
    }

    const imgCoin = cellaNuova[0].querySelector("img");
    if (imgCoin !== null && imgCoin.src.includes("coin.png")) {
      cellaNuova[0].removeChild(imgCoin);
      punteggio += 1;
      punteggioElemento.textContent = punteggio;
      MoneteRimanenti -= 1;
      
      const coordinataAttuale = [player[1], player[0]];
      let giaPresente = false;
      for (let k = 0; k < celleVuote.length; k++) {
        if (celleVuote[k][0] === coordinataAttuale[0] && celleVuote[k][1] === coordinataAttuale[1]) {
          giaPresente = true;
          break; 
        }
      }
      if (!giaPresente) {
        celleVuote.push(coordinataAttuale);
      }

      if (MoneteRimanenti === 0) {
        SpawnaMonete();
      }
    }

    const nuovoImgRobot = document.createElement("img");
    nuovoImgRobot.src = "sprite_gioco/robot.png";
    cellaNuova[0].appendChild(nuovoImgRobot); 
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
    event.preventDefault();
    muoviGiocatore(1, 0);
    }
  if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
    event.preventDefault();
    muoviGiocatore(-1, 0);
  }
  if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
    event.preventDefault();
    muoviGiocatore(0, -1);  
  }
  if (event.key === "ArrowDown" || event.key=== "s" || event.key === "S") {
    event.preventDefault();
    muoviGiocatore(0, 1);
  }
  if (event.key === "P" || event.key === "p") {
    event.preventDefault();
    alert("Pausa attivata. Premi OK per continuare.");
  }
});

function muoviVirus() {
  const direzioni = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1]
  ];

  for (let i = 0; i < mostri.length; i++) {
    const mostro = mostri[i];
    const dirCasuale = direzioni[Math.floor(Math.random() * direzioni.length)];
    
    const nuovaX = mostro.x + dirCasuale[0];
    const nuovaY = mostro.y + dirCasuale[1];

    if (map[nuovaY][nuovaX] !== "#") {
      let cellaOccupataDaAltroMostro = false;
      for (let k = 0; k < mostri.length; k++) {
        if (mostri[k].x === nuovaX && mostri[k].y === nuovaY) {
          cellaOccupataDaAltroMostro = true;
          break;
        }
      }

     if (!cellaOccupataDaAltroMostro) {
        const cellaVecchia = trovaCella(mostro.x, mostro.y);
        if (cellaVecchia !== null) {
          const imgMostro = cellaVecchia[0].querySelector("img");
          if (imgMostro) {
            cellaVecchia[0].removeChild(imgMostro);
          }

          if (mostro.AvevaMonetaSotto) {
            const imgCoin = document.createElement("img");
            imgCoin.src = "sprite_gioco/coin.png";
            cellaVecchia[0].appendChild(imgCoin);
            mostro.AvevaMonetaSotto = false;
          }
        }

        mostro.x = nuovaX;
        mostro.y = nuovaY;

        const cellaNuova = trovaCella(mostro.x, mostro.y);
        if (cellaNuova !== null) {
          const immaginiNuove = cellaNuova[0].querySelectorAll("img");
          for (let j = 0; j < immaginiNuove.length; j++) {
            if (immaginiNuove[j].src.includes("coin.png")) {
              cellaNuova[0].removeChild(immaginiNuove[j]);
              mostro.AvevaMonetaSotto = true;//haMonetaSotto viene inizializzata qui ed è un'attributo dinamico dell'oggetto mostro, che indica se il mostro ha una moneta sotto di lui
              //più che ha una moneta sotto sarebbe aveva una moneta sotto
              break;
            }
          }

          const nuovoImgMostro = document.createElement("img");
          nuovoImgMostro.src = mostro.src;
          cellaNuova[0].appendChild(nuovoImgMostro);
        }
      }
    }

    if (mostro.x === player[0] && mostro.y === player[1]) {
      const cellaGiocatore = trovaCella(player[0], player[1]);
      if (cellaGiocatore !== null) {
        const imgRobot = cellaGiocatore[0].querySelector("img");
        if (imgRobot) {
          cellaGiocatore[0].removeChild(imgRobot);
        }
      }
      alert("Game Over! Un mostro ti ha preso!");
      location.reload();
    }
  }
}

setInterval(muoviVirus, 500);//muove i mostri ogni 500 millisecondi, esegue la funzione muoviVirus ogni 500 millisecondi

});

TornaAlSito.addEventListener("click", () => {
    window.location.href = "schermata_iniziale.html";
    statoSito.textContent = "Caricamento del gioco in corso...";
    statoSito.classList.add("caricamento");
  });
document.body.style.userSelect = "none";//non permette di selezionare il testo della pagina
