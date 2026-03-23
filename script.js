const songs = [
    "Dominic Fike - white keys - wurlighost (128k).mp3",
    "05 Let Down - Remastered.mp3",
    "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3",
    "Tate McRae - Sports Car.mp3",
    "Tate McRae - TIT FOR TAT.mp3",
    "RAYE - Escapism. feat. 070 Shake.mp3",
    "Britney Spears - Gimme More.mp3"
];

let currentSong = 0;
const audio = document.getElementById("bgMusic");

function playSong(index) {
    audio.src = songs[index];
    audio.play();
}

function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    playSong(currentSong);
}

audio.addEventListener("ended", nextSong);

function toggleMusic() {
    if (audio.paused) {
        playSong(currentSong);
    } else {
        audio.pause();
    }
}
