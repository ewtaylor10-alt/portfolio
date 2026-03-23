/* SONG LIST */
const songs = [
    { file: "05 Let Down - Remastered.mp3", name: "Let Down" },
    { file: "Dominic Fike - white keys - wurlighost (128k).mp3", name: "White Keys" },
    { file: "Britney Spears - Gimme More.mp3", name: "Gimme More" },
    { file: "RAYE - Escapism. feat. 070 Shake.mp3", name: "Escapism" },

    { file: "I Thought I Saw Your Face Today.mp3", name: "I Thought I Saw Your Face Today" },
    { file: "Mac Miller - The Spins Lyrics.mp3", name: "The Spins" },
    { file: "Supercut.mp3", name: "Supercut" },
    { file: "back to friends - sombr - SoundLoadMate.com.mp3", name: "Back to Friends" },
    { file: "Ocean Eyes - Billie Eilish.mp3", name: "Ocean Eyes" },
    { file: "Tate McRae - exes (Audio).mp3", name: "Exes" },
    { file: "Tate_McRae_-_Greedy.mp3", name: "Greedy" },
    { file: "Sweater Weather- The Neighbourhood.mp3", name: "Sweater Weather" },
    { file: "The Cranberries - Zombie (Alt. Version).mp3", name: "Zombie (Alt Version)" },

    { file: "Tate McRae - Sports Car.mp3", name: "Sports Car" },
    { file: "Tate McRae - TIT FOR TAT.mp3", name: "Tit For Tat" },
    { file: "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3", name: "Nights Like This" }
];

/* SAVE SONG LIST */
localStorage.setItem("songsList", JSON.stringify(songs));

let currentSong = 0;

/* SAFE ELEMENTS */
const audio = document.getElementById("bgMusic");
const songName = document.getElementById("songName");
const cover = document.getElementById("cover");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");

/* BUILD PLAYLIST (ONLY IF EXISTS) */
if (playlist) {
    songs.forEach((s, i) => {
        let opt = document.createElement("option");
        opt.value = i;
        opt.textContent = s.name;
        playlist.appendChild(opt);
    });

    playlist.addEventListener("change", () => {
        playSong(parseInt(playlist.value));
    });
}

/* RESTORE SONG (FIXED PROPERLY) */
window.addEventListener("load", () => {
    if (!audio) return;

    const savedIndex = localStorage.getItem("songIndex");
    const savedTime = localStorage.getItem("songTime");

    if (savedIndex !== null) {
        currentSong = parseInt(savedIndex);

        audio.src = songs[currentSong].file;

        audio.addEventListener("loadedmetadata", () => {
            audio.currentTime = savedTime || 0;
            audio.play();
        }, { once: true });

        if (songName) songName.innerText = songs[currentSong].name;
        if (cover) cover.src = "c0bba8165dbb9982fa17e300d66f8264.jpg";
        if (playlist) playlist.value = currentSong;

    } else {
        playSong(0);
    }
});

/* SAVE BEFORE LEAVING PAGE */
window.addEventListener("beforeunload", () => {
    if (!audio) return;
    localStorage.setItem("songIndex", currentSong);
    localStorage.setItem("songTime", audio.currentTime);
});

/* PLAY */
function playSong(i) {
    if (!audio) return;

    currentSong = i;

    audio.src = songs[i].file;
    audio.play();

    if (songName) songName.innerText = songs[i].name;
    if (cover) cover.src = "c0bba8165dbb9982fa17e300d66f8264.jpg";
    if (playlist) playlist.value = i;

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
    if (!audio) return;

    const playBtn = document.getElementById("playBtn");

    if (audio.paused) {
        audio.play();
        if (playBtn) playBtn.innerText = "⏸";
    } else {
        audio.pause();
        if (playBtn) playBtn.innerText = "▶";
    }
}

/* PROGRESS */
if (audio) {
    audio.addEventListener("timeupdate", () => {
        if (audio.duration && progress) {
            progress.style.width =
                (audio.currentTime / audio.duration) * 100 + "%";
        }
    });

    audio.addEventListener("ended", nextSong);
}

/* AUTOPLAY CLICK */
document.addEventListener("click", () => {
    if (audio && audio.paused) audio.play();
}, { once: true });

/* LOADER */
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            loader.style.transition = "0.5s";
            setTimeout(() => loader.remove(), 500);
        }
    }, 1800);
});
