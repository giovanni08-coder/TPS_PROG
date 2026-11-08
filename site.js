const btnGioca = document.querySelectorAll(".btn");//lista dei bottoni
const statoSito =  document.getElementById("stato-sito");//paragrafi stato sito
const statoClassifica = document.getElementById("top-lista");//paragrafi stato classifica

async function mostraClassifica() {
    const classifica = JSON.parse(
        localStorage.getItem("classifica")
    ) || [];

    classifica.sort(
        (a, b) => b.punteggio - a.punteggio
    );

    const topLista = document.getElementById("top-lista");

    topLista.innerHTML = "";

    for (let i = 0; i < classifica.length; i++) {
        const li = document.createElement("li");

        li.textContent =
            `${classifica[i].nome} - ${classifica[i].punteggio} punti`;

        topLista.appendChild(li);
    }
}
 async function MostraClassifica() {

await mostraClassifica();
}
MostraClassifica();

const elementili = statoClassifica.querySelectorAll("li");
if(elementili.length > 0) {
  document.getElementById('stato-top').textContent = "Classifica caricata con successo!";
  document.getElementById('stato-top').classList.remove("caricamento");
  document.getElementById('stato-top').classList.add("ok");
  console.log("Sito pronto!");
}else {
  document.getElementById('stato-top').textContent = "in Attesa...";
  document.getElementById('stato-top').classList.add("caricamento");
  console.log("Nessun punteggio salvato!");
}
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


