const songs = [
    "Dominic Fike - white keys - wurlighost (128k).mp3",
    "05 Let Down - Remastered.mp3",
    "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3"
];

let currentSong = 0;

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const songName = document.getElementById("songName");

/* PLAY SONG */
function playSong(index) {
    audio.src = songs[index];
    audio.play();
    playBtn.innerText = "⏸";
    songName.innerText = songs[index];
}

/* NEXT */
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
}

/* PREV */
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong(currentSong);
}

/* PLAY/PAUSE */
function toggleMusic() {
    if (audio.paused) {
        playSong(currentSong);
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

audio.addEventListener("ended", nextSong);

/* CURSOR GLOW */
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
