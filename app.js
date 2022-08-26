class MusicPlayer {
   constructor() {
      this.allElements()
      this.allEventListener()
      this.loadSongs(this.songs[0])
   }

   allElements() {
      this.play = document.getElementById("play");
      this.song = document.querySelector("audio");
      this.songName = document.getElementById("song-name");
      this.title = document.getElementById("song-title");
      this.animePoster = document.getElementById("anime-poster");
      this.progressBar = document.getElementById("progress-bar");
      this.startTime = document.getElementById("start-time");
      this.endTime = document.getElementById("end-time");
      this.progress = document.getElementById("progress");
      this.next = document.getElementById("next");
      this.prev = document.getElementById("prev");
      this.playing = true;
      this.songIndex = 0;
      this.songs = [
      {
         name: "HNY",
         song: "1",
         title: "Manwa lage",
         cover: "songs/faded.png"
      },
      {
         name: "Honey Singh",
         song: "2",
         title: "Honey singh song one",
         cover: "songs/fallingdown.jpg"
      },
      {
         name: "Honey Singh",
         song: "3",
         title: "Honey singh song two",
         cover: "songs/ratherbe.jpg"
      },
      {
         name: "Honey Singh",
         song: "4",
         title: "Honey singh song three",
         cover: "songs/faded.png"
      },
      {
         name: "Honey Singh",
         song: "5",
         title: "Honey singh song four",
         cover: "songs/stay.png"
      }
      ]
   };

   allEventListener() {
      this.play.addEventListener("click", () => {
         (this.playing) ? this.songPlay() : this.songPause();
      });

      this.song.addEventListener("timeupdate", (music) => {
         let currentT = music.srcElement.currentTime;
         let duration = music.srcElement.duration;
         let totalPer = (currentT / duration) * 100;
         this.progressBar.style.width = totalPer + "%";

         let songInMin = Math.floor(duration / 60);
         let songInSec = Math.floor(duration % 60);
         if (songInSec < 10) {
            songInSec = "0" + songInSec;
         }
         let completeSongTime = songInMin + ":" + songInSec;
         if (duration) {
            this.endTime.textContent = completeSongTime;
         }

         let starSongInMin = Math.floor(currentT / 60);
         let starSongInSec = Math.floor(currentT % 60);
         if (starSongInSec < 10) {
            starSongInSec = "0" + starSongInSec;
         }
         let StartSongTime = starSongInMin + ":" + starSongInSec;
         this.startTime.textContent = StartSongTime;
      });

      this.song.addEventListener("ended", () => {
         this.nextSong();
      });

      this.next.addEventListener("click", () => {
         this.nextSong()
      });

      this.prev.addEventListener("click", () => {
         this.prevSong()
      });

      this.progress.addEventListener("click", () => {
         this.seekBarProgress(event);
      })
   }

   songPlay() {
      this.playing = false;
      this.song.play();
      this.play.classList.replace("fa-play", "fa-pause");
      this.animePoster.classList.add("anime");
   }

   songPause() {
      this.playing = true;
      this.song.pause();
      this.play.classList.replace("fa-pause", "fa-play");
      this.animePoster.classList.remove("anime");
   }

   loadSongs(songs) {
      this.songName.innerText = songs.name;
      this.song.src = "songs/"+songs.song+".mp3";
      this.title.innerText = songs.title;
      this.animePoster.src = songs.cover;
   }

   nextSong () {
      this.songIndex = (this.songIndex + 1) % this.songs.length;
      this.loadSongs(this.songs[this.songIndex]);
      this.songPlay()
   }

   prevSong() {
      this.songIndex = (this.songIndex - 1 + this.songs.length) % this.songs.length;
      this.loadSongs(this.songs[this.songIndex]);
      this.songPlay()
   }

   seekBarProgress(event) {
      let songFullWidth = event.srcElement.clientWidth;
      let songCurrentWidth = event.offsetX;
      let duration = this.song.duration;
      let songPercentage = (songCurrentWidth / songFullWidth) * duration;
      this.song.currentTime = songPercentage;
   }
}

new MusicPlayer();