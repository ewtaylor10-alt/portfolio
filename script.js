const songs = [
    { file: "05 Let Down - Remastered.mp3", name: "Let Down" },
    { file: "Britney Spears - Gimme More.mp3", name: "Gimme More" },
    { file: "Dominic Fike - white keys - wurlighost (128k).mp3", name: "White Keys" },
    { file: "RAYE - Escapism. feat. 070 Shake.mp3", name: "Escapism" }
];

let currentSong = Math.floor(Math.random() * songs.length);
let shuffle = true;

const audio = document.getElementById("bgMusic");
const songName = document.getElementById("songName");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");

/* LOAD SONG */
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
    currentSong = Math.floor(Math.random() * songs.length);
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

/* AUTO PLAY FIX */
document.addEventListener("click", () => {
    if (audio.paused) playSong();
}, { once: true });

/* LOAD FIX */
window.onload = () => {
    loadSong(currentSong);

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1500);
};

/* CURSOR + PARTICLES */
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY + "px";

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 500);
});

/* WAVEFORM */
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 60;

function drawWave() {
    ctx.clearRect(0,0,300,60);

    for(let i=0;i<30;i++){
        let h = Math.random() * (audio.paused ? 10 : 40);
        ctx.fillStyle = "white";
        ctx.fillRect(i*10,60-h,5,h);
    }

    requestAnimationFrame(drawWave);
}
drawWave();
