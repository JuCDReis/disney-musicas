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
    {   name: "easy on me",
        artist: "adele",
        url: "./DIVAS/Adele - Easy On Me (Official Lyric Video).mp3"
    },
    {
        name: "no one",
        artist: "alicia keys",
        url: "./DIVAS/Alicia Keys - No One (Official Music Video).mp3"
    },
    {
        name: "shallow",
        artist: "lady gaga",
        url: "./DIVAS/Lady Gaga, Bradley Cooper - Shallow (Lyrics) (A Star Is Born Soundtrack).mp3"
    },
    {
        name: "hero",
        artist: "mariah carey",
        url: "./DIVAS/Hero - Mariah Carey (Lyric Video) Musicarmonix.mp3"
    },
    {
        name: "remedy",
        artist: "adele",
        url: "./DIVAS/Remedy - Adele (Lyrics) 🎵.mp3"
    },
    {
        name: "lift me up",
        artist: "rihanna",
        url: "./DIVAS/Rihanna - Lift Me Up (Lyrics).mp3"
    }
]

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
  playTrack = ramdomOrder(tracks);
  trackName = playTrack[index].name;
    if (player.paused) {
      player.play();
      isPlaying = true;
      chances--;
      ptsValendo = ptsValendo - 5;
      setTimeout(() => {
        player.pause();
        isPlaying = false;
      }, 1000);
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
    ptsValendo = 20;
    if ((type == "next" && index + 1 === tracks.length) || type === "init") {
        index = 0;
      } else if (type == "prev" && index === 0) {
        index = tracks.length;
      } else {
        index = type === "prev" && index ? index - 1 : index + 1;
      }
      player.src = tracks[index].url;  
      contadorMusicas++;
      if (type !== "init") playPause();  
}

// function to check the answer
const checkAnswer = () => {
    let acerto;
    resposta = document.getElementById("answer").value;
    resposta = resposta.toLowerCase();
    resposta = resposta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    trackName = tracks[index].name;
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
        if (pontos<0) {
          pontos = 0;
        }
        localStorage.setItem("total-pts", pontos);
          
            var v_pontuacao = JSON.parse(localStorage.getItem("pontos_jogador")) || [];
            v_pontuacao.push(pontos);
            localStorage.setItem("pontos_jogador", JSON.stringify(v_pontuacao));
          
            window.location.href = "./end.html";
      }
      nextTrack();
    }
  }

nextTrack("init");
document.getElementById("answer").value = "";
document.querySelector(".pontos").innerHTML = `<h2>${pontos}</h2>`;
