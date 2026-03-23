const songs = [
    { file: "05 Let Down - Remastered.mp3", name: "Let Down" },
    { file: "Dominic Fike - white keys - wurlighost (128k).mp3", name: "White Keys" },
    { file: "Britney Spears - Gimme More.mp3", name: "Gimme More" },
    { file: "RAYE - Escapism. feat. 070 Shake.mp3", name: "Escapism" },
    { file: "SpotiDownloader.com - Champagne Coast - Blood Orange.mp3", name: "Champagne Coast" },
    { file: "Tate McRae - Sports Car.mp3", name: "Sports Car" },
    { file: "Tate McRae - TIT FOR TAT.mp3", name: "Tit For Tat" },
    { file: "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3", name: "Nights Like This" }
];

let currentSong = 0;

const audio = document.getElementById("bgMusic");
const songName = document.getElementById("songName");
const cover = document.getElementById("cover");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");

/* BUILD PLAYLIST */
songs.forEach((s, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = s.name;
    playlist.appendChild(opt);
});

/* SELECT SONG */
playlist.addEventListener("change", () => {
    playSong(parseInt(playlist.value));
});

/* RESTORE SONG BETWEEN PAGES */
window.addEventListener("load", () => {
    const savedIndex = localStorage.getItem("songIndex");
    const savedTime = localStorage.getItem("songTime");

    if (savedIndex !== null) {
        currentSong = parseInt(savedIndex);
        audio.src = songs[currentSong].file;

        audio.currentTime = savedTime || 0;
        audio.play();

        songName.innerText = songs[currentSong].name;
        cover.src = "c0bba8165dbb9982fa17e300d66f8264.jpg";

        playlist.value = currentSong;
    } else {
        // default first load
        playSong(0);
    }
});

/* PLAY FUNCTION */
function playSong(i) {
    currentSong = i;

    audio.src = songs[i].file;
    audio.play();

    songName.innerText = songs[i].name;
    cover.src = "c0bba8165dbb9982fa17e300d66f8264.jpg";

    playlist.value = i;

    const playBtn = document.getElementById("playBtn");
    if (playBtn) playBtn.innerText = "⏸";
}

/* CONTROLS */
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong(currentSong);
}

function toggleMusic() {
    const playBtn = document.getElementById("playBtn");

    if (audio.paused) {
        audio.play();
        if (playBtn) playBtn.innerText = "⏸";
    } else {
        audio.pause();
        if (playBtn) playBtn.innerText = "▶";
    }
}

/* PROGRESS BAR */
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.style.width =
            (audio.currentTime / audio.duration) * 100 + "%";
    }
});

/* AUTO NEXT */
audio.addEventListener("ended", nextSong);

/* AUTOPLAY ON FIRST CLICK */
document.addEventListener("click", () => {
    if (audio.paused) audio.play();
}, { once: true });
