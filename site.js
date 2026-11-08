let btnGioca = document.querySelectorAll(".btn");//lista dei bottoni
let statoSito =  document.getElementById("stato-sito");//paragrafi stato sito


btnGioca.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "gioco.html";
    statoSito.textContent = "Caricamento del gioco in corso...";
    statoSito.classList.add("caricamento");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
      window.location.href = "gioco.html";
      statoSito.textContent = "Caricamento del gioco in corso...";
      statoSito.classList.add("caricamento");
  }
});

