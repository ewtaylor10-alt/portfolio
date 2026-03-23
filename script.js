const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

audio.src = "Dominic Fike - white keys - wurlighost (128k).mp3";

/* PLAY */
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

/* AUTOPLAY FIX */
document.addEventListener("click", () => {
    if (audio.paused) audio.play();
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

for (let i = 0; i < 70; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.y -= p.speed + audio.currentTime * 0.03;

        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = "#82beff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
