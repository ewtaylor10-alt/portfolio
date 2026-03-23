const songs = [
    { file: "05 Let Down - Remastered.mp3", name: "Let Down" },
    { file: "Britney Spears - Gimme More.mp3", name: "Gimme More" },
    { file: "Dominic Fike - white keys - wurlighost (128k).mp3", name: "White Keys" },
    { file: "RAYE - Escapism. feat. 070 Shake.mp3", name: "Escapism" },
    { file: "SpotiDownloader.com - Champagne Coast - Blood Orange.mp3", name: "Champagne Coast" },
    { file: "Tate McRae - Sports Car.mp3", name: "Sports Car" },
    { file: "Tate McRae - TIT FOR TAT.mp3", name: "Tit For Tat" },
    { file: "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3", name: "Nights Like This" }
];

let currentSong = Math.floor(Math.random() * songs.length);
let shuffle = true;

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const songName = document.getElementById("songName");

/* LOAD */
function loadSong(i) {
    audio.src = songs[i].file;
    songName.innerText = songs[i].name;
}

/* PLAY */
function playSong() {
    audio.play();
    playBtn.innerText = "⏸";
}

function toggleMusic() {
    if (audio.paused) playSong();
    else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

function nextSong() {
    currentSong = shuffle
        ? Math.floor(Math.random() * songs.length)
        : (currentSong + 1) % songs.length;

    loadSong(currentSong);
    playSong();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
}

function shuffleToggle() {
    shuffle = !shuffle;
}

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

/* AUTO NEXT */
audio.addEventListener("ended", nextSong);

/* AUTOPLAY */
window.addEventListener("load", () => {
    loadSong(currentSong);

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1500);
});

document.addEventListener("click", () => {
    if (audio.paused) playSong();
}, { once: true });

/* WAVEFORM */
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 60;

function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 40; i++) {
        let h = Math.random() * (audio.paused ? 10 : 50);
        ctx.fillStyle = "#82beff";
        ctx.fillRect(i * 8, 60 - h, 4, h);
    }

    requestAnimationFrame(drawWave);
}

drawWave();
