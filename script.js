const songs = [
    "Dominic Fike - white keys - wurlighost (128k).mp3",
    "05 Let Down - Remastered.mp3",
    "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3",
    "Tate McRae - Sports Car.mp3"
];

let currentSong = 0;
const audio = document.getElementById("bgMusic");
const songName = document.getElementById("songName");

// update song name
function updateName() {
    songName.innerText = songs[currentSong];
}

function playSong(index) {
    audio.src = songs[index];
    audio.play();
    updateName();
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong(currentSong);
}

function toggleMusic() {
    if (audio.paused) {
        playSong(currentSong);
    } else {
        audio.pause();
    }
}

audio.addEventListener("ended", nextSong);

// 🔥 auto play after first click anywhere
document.body.addEventListener("click", () => {
    if (audio.paused) {
        playSong(currentSong);
    }
}, { once: true });
