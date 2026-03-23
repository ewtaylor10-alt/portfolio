const songs = [
    { file: "Dominic Fike - white keys - wurlighost (128k).mp3", name: "White Keys" },
    { file: "05 Let Down - Remastered.mp3", name: "Let Down" },
    { file: "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3", name: "Nights Like This" }
];

let currentSong = 0;

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const songName = document.getElementById("songName");
const progress = document.getElementById("progress");

/* PLAY */
function playSong(index) {
    audio.src = songs[index].file;
    audio.play();
    playBtn.innerText = "⏸";
    songName.innerText = songs[index].name;
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

/* TOGGLE */
function toggleMusic() {
    if (audio.paused) {
        playSong(currentSong);
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

/* PROGRESS UPDATE */
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
});

/* NEXT AUTO */
audio.addEventListener("ended", nextSong);

/* AUTOPLAY (best possible) */
window.addEventListener("load", () => {
    audio.src = songs[currentSong].file;
    audio.play().catch(() => {});
    songName.innerText = songs[currentSong].name;
});

/* CLICK FALLBACK */
document.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    }
}, { once: true });

/* CURSOR */
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
