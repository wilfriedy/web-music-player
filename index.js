let song = document.querySelector("audio");
let playBtn = document.querySelector(".fa-play");
let nextBtn = document.querySelector(".fa-forward");
let prevBtn = document.querySelector(".fa-backward");
let progressWidth = document.querySelector(".progress-bar-fill");
let progressBar = document.querySelector(".progress-bar");
let startTime = document.querySelector(".start");
let endTime = document.querySelector(".end");
let albumCover = document.querySelector(".img-cover");
let musicTile = document.querySelector(".title");
let songArtist = document.querySelector(".artist");
let loops = document.querySelector(".setLoop");
let like = document.querySelector('.fa-heart')
let num = 0;
let loadDiv = document.querySelector(".intro-load");

window.addEventListener('load', () => {
  setTimeout(() => {
    loadDiv.style.display = 'none'
    loadDiv.style.visibility = 'none'
  }, 3000)
})

let songsData = [
  {
    songTitle: "No Role Modelz",
    songFile: "./audio/No Role Modelz.mp3",
    artist: "J Cole",
    coverImg: "./img/No Role Modelz.jpg",
  },
  {
    songTitle: "Jesus Walks",
    songFile: "./audio/Jesus Walks.mp3",
    artist: "Kanye West",
    coverImg: "./img/The College Dropout.jpg",
  },
  {
    songTitle: "Through The Wire",
    songFile: "./audio/Through The Wire.mp3",
    artist: "Kanye West",
    coverImg: "./img/The College Dropout.jpg",
  },
  {
    songTitle: "Mountain Sound",
    songFile: "./audio/Mountain Sound.mp3",
    artist: "Of Monsters & Men",
    coverImg: "./img/Of Monsters And Men.jpg",
  },
  {
    songTitle: "Wolves Without Teeth",
    songFile: "./audio/Wolves Without Teeth.mp3",
    artist: "Of Monsters & Men",
    coverImg: "./img/Of Monsters And Men.jpg",
  },
];

// like functionality handler
function likeHandler() {
  like.classList.add("liked");
  setTimeout(() => {
    like.classList.remove("liked");
  }, 200);
  like.style.color ? (like.style.color = "") : (like.style.color = "red");
}

// getting songs properties and allow to select next song

function changeSong(count) {
  let { songTitle, songFile, artist, coverImg } = songsData[count];
  musicTile.textContent = songTitle;
  albumCover.src = coverImg;
  song.src = songFile;
  songArtist.textContent = artist;
}
changeSong(0);

// quick pause when a song ends and another is selected and starts to play

function flashPausePlay() {
  playBtn.classList.replace("fa-pause", "fa-play");
  setTimeout(() => {
    playBtn.classList.replace("fa-play", "fa-pause");
  }, 100);
}
// next song 
function nextSong() {
   num++;
   if (num == songsData.length) {
     num = 0;
   }

   flashPausePlay();
   changeSong(num);
   song.play();
}

// previous song

function previousSong() {
  num--;
  if (num < 0) {
    num = songsData.length - 1;
  }
  flashPausePlay();
  changeSong(num);
  song.play();

}

// boolean to check song mode 
let isPlaying = false;

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play","fa-pause")
  song.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  song.pause();
};



song.addEventListener("timeupdate", (e) => {
  let { duration, currentTime } = song;
  let countSec = Math.floor(currentTime % 60);
  let countMin = Math.floor(currentTime / 60);
  let totalDuration = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);

  // update time
  startTime.textContent = `${countMin
    .toString()
    .padStart(2, 0)} : ${countSec.toString().padStart(2, 0)}`;
  if (duration) {
    endTime.textContent = `${totalDuration
      .toString()
      .padStart(2, 0)} : ${seconds.toString().padStart(2, 0)}`;
  }
  // progress bar update
  let widthDistance = Math.floor((currentTime * 100) / duration);
  progressWidth.style.width = `${widthDistance}%`;
});

// for repeating or single song
let isLooping = true;

function setLoopFalse() {
  loops.textContent = "🔁";
  loops.setAttribute('title', 'repeat all')
  isLooping = false;

}

function setLoopTrue() {
  loops.textContent = "🔂";
  loops.setAttribute("title", "repeat single");
  isLooping = true;
}

// check looping state

function loopState() {
  isLooping ? setLoopFalse() : setLoopTrue();
  song.loop = isLooping;
}

// song play total time and update

function songElementHandler() {
  let { duration, currentTime } = song;
    let countSec = Math.floor(currentTime % 60);
    let countMin = Math.floor(currentTime / 60);
    let totalDuration = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);

    // update time
    startTime.textContent = `${countMin
      .toString()
      .padStart(2, 0)} : ${countSec.toString().padStart(2, 0)}`;
    if (duration) {
      endTime.textContent = `${totalDuration
        .toString()
        .padStart(2, 0)} : ${seconds.toString().padStart(2, 0)}`;
    }
    // progress bar update
    let widthDistance = Math.floor((currentTime * 100) / duration);
    progressWidth.style.width = `${widthDistance}%`
}

// to enable playover of current song or continue to next song
function checkSongEnding() {
  if (song.loop) {
    console.log(num);
    changeSong(num);
    flashPausePlay();
    song.play();
  } else {
    num++;
    if (num == songsData.length) {
      num = 0;
    }
    flashPausePlay();
    changeSong(num);
    song.play();
  }
}

// jump song to any position relative to progress bar 

progressBar.addEventListener("click", (e) => {
  let barWidth = e.target.clientWidth;
  let postitionInSong = (e.offsetX / barWidth) * song.duration;
  song.currentTime = postitionInSong;
});


like.addEventListener("click", likeHandler);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", previousSong);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
loops.addEventListener("click", loopState);
song.addEventListener('timeupdate', songElementHandler)
song.addEventListener("ended", checkSongEnding);

// https://github.com/wilfriedy/web-music-player.git