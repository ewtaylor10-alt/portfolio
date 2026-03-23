const songs = [
"05 Let Down - Remastered.mp3",
"Britney Spears - Gimme More.mp3",
"Dominic Fike - white keys - wurlighost (128k).mp3",
"RAYE - Escapism. feat. 070 Shake.mp3",
"SpotiDownloader.com - Champagne Coast - Blood Orange.mp3",
"Tate McRae - Sports Car.mp3",
"Tate McRae - TIT FOR TAT.mp3",
"The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3"
];

let index = Math.floor(Math.random()*songs.length);
let isShuffle = true;

const audio = document.getElementById("audio");
const name = document.getElementById("songName");
const progress = document.getElementById("progress");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const volume = document.getElementById("volume");

/* LOAD SONG */
function loadSong() {
    audio.src = songs[index];
    name.innerText = songs[index].replace(".mp3","");
}

/* PLAY */
function playSong() {
    audio.play();
    playBtn.innerText = "⏸";
}

/* PAUSE */
function pauseSong() {
    audio.pause();
    playBtn.innerText = "▶";
}

/* TOGGLE */
playBtn.onclick = () => {
    if (audio.paused) playSong();
    else pauseSong();
};

/* NEXT */
nextBtn.onclick = () => {
    if (isShuffle) {
        index = Math.floor(Math.random()*songs.length);
    } else {
        index = (index + 1) % songs.length;
    }
    loadSong();
    playSong();
};

/* PREV */
prevBtn.onclick = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong();
    playSong();
};

/* SHUFFLE */
shuffleBtn.onclick = () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.opacity = isShuffle ? "1" : "0.5";
};

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.style.width =
            (audio.currentTime / audio.duration) * 100 + "%";
    }
});

/* CLICK TO SEEK */
document.querySelector(".progress-bar").onclick = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
};

/* VOLUME */
volume.oninput = () => {
    audio.volume = volume.value;
};

/* AUTO NEXT */
audio.onended = () => {
    nextBtn.click();
};

/* LOAD + FIX AUTOPLAY */
window.onload = () => {
    loadSong();

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 800);
};

/* REQUIRED USER CLICK FOR SOUND */
document.body.addEventListener("click", () => {
    if (audio.paused) playSong();
}, { once: true });
