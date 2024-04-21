// Select the HTML elements for displaying the user's nickname and points
const nickname = document.querySelector('#nome');
const pts = document.querySelector('#pontos');
const ranking = document.querySelector('.podio');

// Retrieve the user's nickname, total points, and an array of nicknames with their corresponding points from local storage
var nick = localStorage.getItem('nick')
var pontuacao = localStorage.getItem('total-pts');
var apelidos = JSON.parse(localStorage.getItem('apelidos')) || [];
var v_pontuacao = JSON.parse(localStorage.getItem('pontos_jogador')) || [];

// Display the user's nickname and total points on the webpage
nickname.innerHTML = `Parabéns ${nick}!`;
pts.innerHTML = `${pontuacao} pontos`;

// Create an array of objects, where each object contains a nickname and its corresponding points
var jogadores = [];
for (var i = 0; i < apelidos.length; i++) {
  jogadores.push({ apelido: apelidos[i], pontuacao: v_pontuacao[i] });
}

// Sort the array of objects based on the points in descending order
jogadores.sort(function(a, b) {
    return b.pontuacao - a.pontuacao;
  });

// Display the top 5 players on the webpage
for (var j = 0; j < jogadores.length; j++) {
    if (j<=4){
      ranking.innerHTML += `
      <h2><img src="./assets/${j+1}-place.svg"> ${jogadores[j].apelido}: ${jogadores[j].pontuacao} pontos</h2>`
    }
    console.log(jogadores);
       }

// Add an event listener to the 'Play Again' button that reloads the webpage when clicked
document.querySelector('#btn-play-again').addEventListener('click', function(){
  window.location.href='./index.html'
})