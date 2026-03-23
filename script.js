const songs = [
    {
        file: "05 Let Down - Remastered.mp3",
        name: "Let Down",
        cover: "https://i.pinimg.com/736x/1c/f8/70/1cf870c7-9b40-48ff-ab7f-68588dce4353.png"
    },
    {
        file: "Dominic Fike - white keys - wurlighost (128k).mp3",
        name: "White Keys",
        cover: "https://i.pinimg.com/736x/7b/f5/41/7bf54150f1d216e9f64de42e3150a76a.jpg"
    },
    {
        file: "Britney Spears - Gimme More.mp3",
        name: "Gimme More",
        cover: "https://i.pinimg.com/736x/ea/5b/25/ea5b25f6-614c-4cfe-8b97-1a0f3a402d60.png"
    },
    {
        file: "RAYE - Escapism. feat. 070 Shake.mp3",
        name: "Escapism",
        cover: "https://i.pinimg.com/736x/ea/5b/25/ea5b25f6-614c-4cfe-8b97-1a0f3a402d60.png"
    },
    {
        file: "SpotiDownloader.com - Champa.mp3",
        name: "Champagne Coast",
        cover: "https://i.pinimg.com/736x/7b/f5/41/7bf54150f1d216e9f64de42e3150a76a.jpg"
    },
    {
        file: "Tate McRae - Sports Car.mp3",
        name: "Sports Car",
        cover: "https://i.pinimg.com/736x/1c/f8/70/1cf870c7-9b40-48ff-ab7f-68588dce4353.png"
    },
    {
        file: "Tate McRae - TIT FOR TAT.mp3",
        name: "Tit For Tat",
        cover: "https://i.pinimg.com/736x/1c/f8/70/1cf870c7-9b40-48ff-ab7f-68588dce4353.png"
    },
    {
        file: "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3",
        name: "Nights Like This",
        cover: "https://i.pinimg.com/736x/ea/5b/25/ea5b25f6-614c-4cfe-8b97-1a0f3a402d60.png"
    }
];

let currentSong = 0;

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const songName = document.getElementById("songName");
const progress = document.getElementById("progress");
const cover = document.getElementById("cover");
const volume = document.getElementById("volume");

/* PLAY */
function playSong(index) {
    audio.src = songs[index].file;
    audio.play();

    songName.innerText = songs[index].name;
    cover.src = songs[index].cover;

    playBtn.innerText = "⏸";
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

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + "%";
    }
});

/* AUTO NEXT */
audio.addEventListener("ended", nextSong);

/* VOLUME */
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

/* AUTOPLAY FIX */
document.addEventListener("click", () => {
    if (audio.paused) playSong(currentSong);
}, { once: true });
