const player = document.querySelector('#player');
const playPauseButton = document.querySelector("#play-music");
const check = document.querySelector('#btn-check');
let resposta = document.getElementById("answer").value;
let trackName;
let pontos = 0;
let ptsValendo = 15;
let chances = 3;
let index = 0;
let contadorMusicas = 0;
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


playPauseButton.onclick = () => playPause();
check.onclick = () => checkAnswer();

const playPause = () => {
  trackName = tracks[index].name;
  console.log(trackName);
    if (player.paused) {
      player.play();
      clearTimeout();
      setTimeout(() => {
        player.pause();
    }, 5000);
    } else {
      player.pause();
    }
  };

const nextTrack = (type = "next")=>{
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
const checkAnswer = () => {

  let acerto;

  resposta = resposta.toLowerCase();
  resposta = resposta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  trackName = tracks[index].name;
  trackName = trackName.toLowerCase();
  trackName = trackName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (resposta === trackName) {
    console.log("acerto");
  } else {
    console.log('realmente não estou reconhecendo a desgraça do nome da música');
  }
};
// const checkAnswer = () => {
//   let acerto;
//     resposta = resposta.toLowerCase();
//     resposta = resposta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//     switch (resposta) {
//       case trackName:
//         console.log("acerto");
//         break;
    
//       default:
//         console.log('realmente não estou reconhecendo a desgraça do nome da música');
//         break;
//     }
    
    
// };
  
nextTrack("init");
document.getElementById("answer").value = "";
document.querySelector(".pontos").innerHTML = `<h2>${pontos}</h2>`;
