// define the DOM and main variables for the game
const player = document.querySelector('#player');
const playPauseButton = document.querySelector("#play-music");
const check = document.querySelector('#btn-check');
let resposta = document.getElementById("answer").value;
let trackName;
let playTrack;
let pontos = 0;
let ptsValendo = 20;
let chances = 4;
let index = 0;
let contadorMusicas = 0;
let contadorErros = 0;

// define the playlist with the tracks
const tracks = [
    {   name: "minha intuição",
        artist: "frozen 2",
        url: "./tracks/Taryn, AURORA - Minha Intuição (De Frozen 2Lyric Video).mp3"
    },
    {
        name: "aqui no mar",
        artist: "a pequena sereia",
        url: "./tracks/[Instrumental Theme] Under The Sea [The Little Mermaid].mp3"
    },
    {
        name: "noites da arábia",
        artist: "aladdin",
        url: "./tracks/Aladdin - Noites da Arábia.mp3"
    },
    {
        name: "amigo estou aqui",
        artist: "toy story",
        url: "./tracks/Amigo estou aqui - Toy Story (Animação com letra).mp3"
    },
    {
        name: "saber quem sou - parte 2",
        artist: "moana",
        url: "./tracks/Any Gabrielly - Saber Quem Sou, segunda parte (De Moana um mar de aventurasCom letra).mp3"
    },
    {
        name: "un poco loco",
        artist: "viva a vida é uma festa",
        url: "./tracks/Arthur Salerno, Leandro Luna - Un Poco Loco (De Viva - A Vida é uma FestaCom letra).mp3"
    },
    {
      name: "hakuna matata",
      artist: "rei leão",
      url: "./tracks/Hakuna Matata (from The Lion King).mp3"
    },
    {
    name: "não falamos do bruno",
    artist: "encanto",
    url: "./tracks/Lin-Manuel Miranda - We Don't Talk About Bruno (From _Encanto_-Instrumental-Audio Only).mp3"
    },
    {
    name: "married life",
    artist: "up",
    url: "./tracks/Michael Giacchino - Married Life (Pixar's Up Soundtrack) [Piano Version].mp3"
    },
    {
      name: "vejo uma porta abrir",
      artist: "frozen",
      url: "./tracks/Olavo Cavalheiro Gabi Porto - Vejo Uma Porta Abrir (From Frozen Uma Aventura Congelante).mp3"
    },
    {
      name: "try everything",
      artist: "zootopia",
      url: "./tracks/Shakira - Try Everything (Audio).mp3"
    },
    {
      name: "quando minha vida vai começar",
      artist: "enrolados",
      url: "./tracks/Sylvia Salustti - Quando a Minha Vida Vai Começar (De Enrolados _Vídeo Oficial).mp3"
    }
]
playTrack = ramdomOrder(tracks);
let isPlaying = false;

// call the functions to start the game
playPauseButton.onclick = () => playPause();
check.onclick = () => checkAnswer();

// function to set the tracks ramdomly
function ramdomOrder(array) {
  for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// function to the play button
const playPause = () => {
    if (player.paused) {
      player.play();
      isPlaying = true;
      chances--;
      ptsValendo = ptsValendo - 5;
      setTimeout(() => {
        player.pause();
        isPlaying = false;
      }, 5000);
    } else {
      player.pause();
      isPlaying = false;
    }


    if (chances == 0) {
      nextTrack();
    }
  };

// function to play the next track
const nextTrack = (type = "next")=>{
    chances = 4;
    contadorMusicas++;
    console.log(contadorMusicas)
    if (contadorMusicas == 12) {
      gameOver();
    }
    ptsValendo = 20;
    trackName = playTrack[index].artist;

    if ((type == "next" && index + 1 === playTrack.length) || type === "init") {
        index = 0;
      } else if (type == "prev" && index === 0) {
        index = playTrack.length;
      } else {
        index = type === "prev" && index ? index - 1 : index + 1;
      }
      player.src = playTrack[index].url;  
      if (type !== "init") playPause();  
}

// function to check the answer
const checkAnswer = () => {
    let acerto;
    resposta = document.getElementById("answer").value;
    resposta = resposta.toLowerCase();
    resposta = resposta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    trackName = playTrack[index].artist;
    trackName = trackName.toLowerCase();
    trackName = trackName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (resposta === trackName) {
      pontos = pontos + ptsValendo;
      document.querySelector(".pontos").innerHTML = `<h2>${pontos}</h2>`;
      document.getElementById("answer").value = "";
      nextTrack();
      
    } else {
      pontos = pontos - 5; 
      document.querySelector(".pontos").innerHTML = `<h2>${pontos}</h2>`;
      
      contadorErros++;
      if (contadorErros == 3) {
        gameOver();
      }
      nextTrack();
    }
  }

  
const gameOver = ()=>{
  if (pontos<0) {
    pontos = 0;
  }
  localStorage.setItem("total-pts", pontos);
    
      var v_pontuacao = JSON.parse(localStorage.getItem("pontos_jogador")) || [];
      v_pontuacao.push(pontos);
      localStorage.setItem("pontos_jogador", JSON.stringify(v_pontuacao));
    
      window.location.href = "./end.html";
}

nextTrack("init");
document.getElementById("answer").value = "";
document.querySelector(".pontos").innerHTML = `<h2>${pontos}</h2>`;
