const songs = [
"05 Let Down - Remastered.mp3",
"Britney Spears - Gimme More.mp3",
"Dominic Fike - white keys - wurlighost (128k).mp3",
"RAYE - Escapism. feat. 070 Shake.mp3",
"SpotiDownloader.com - Champagne Coast - Blood Orange.mp3",
"Tate McRae - Sports Car.mp3",
"Tate McRae - TIT FOR TAT.mp3",
"The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3"
];

let i = Math.floor(Math.random()*songs.length);
const audio = document.getElementById("audio");
const name = document.getElementById("songName");
const progress = document.getElementById("progress");
const btn = document.getElementById("playBtn");

function loadSong() {
    audio.src = songs[i];
    name.innerText = songs[i].split(" - ")[1] || songs[i];
}
function play() {
    audio.play();
    btn.innerText = "⏸";
}
function toggleMusic() {
    if(audio.paused) play();
    else {
        audio.pause();
        btn.innerText="▶";
    }
}
function nextSong() {
    i = Math.floor(Math.random()*songs.length);
    loadSong(); play();
}
function prevSong() {
    i = (i-1+songs.length)%songs.length;
    loadSong(); play();
}
function shuffleToggle(){}

audio.addEventListener("timeupdate",()=>{
    progress.style.width=(audio.currentTime/audio.duration)*100+"%";
});

/* AUTOPLAY FIX */
document.addEventListener("click",()=>play(),{once:true});

/* LOADER FIX */
window.onload=()=>{
    loadSong();
    setTimeout(()=>{
        document.getElementById("loader").style.display="none";
    },1500);
};

/* CURSOR + TRAIL */
const cursor=document.getElementById("cursor");
document.addEventListener("mousemove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";

    const p=document.createElement("div");
    p.className="particle";
    p.style.left=e.clientX+"px";
    p.style.top=e.clientY+"px";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),400);
});

/* WAVE */
const c=document.getElementById("wave");
const ctx=c.getContext("2d");
c.width=280; c.height=60;

function draw(){
    ctx.clearRect(0,0,280,60);
    for(let j=0;j<30;j++){
        let h=Math.random()*(audio.paused?10:40);
        ctx.fillStyle="white";
        ctx.fillRect(j*10,60-h,5,h);
    }
    requestAnimationFrame(draw);
}
draw();
