const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const cover = document.getElementById("cover");
const songName = document.getElementById("songName");

const songs = [
    {
        file: "Dominic Fike - white keys - wurlighost (128k).mp3",
        name: "White Keys",
        cover: "https://i.pinimg.com/736x/7b/f5/41/7bf54150f1d216e9f64de42e3150a76a.jpg"
    }
];

let currentSong = 0;

function playSong(i) {
    audio.src = songs[i].file;
    audio.play();
    cover.src = songs[i].cover;
    songName.innerText = songs[i].name;
    playBtn.innerText = "⏸";
}

function toggleMusic() {
    if (audio.paused) playSong(currentSong);
    else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

/* CLICK TO PLAY */
document.addEventListener("click", () => {
    if (audio.paused) playSong(currentSong);
}, { once: true });

/* CURSOR */
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3,
        speed: Math.random() * 1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.y -= p.speed + audio.currentTime * 0.05;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = "#82beff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
