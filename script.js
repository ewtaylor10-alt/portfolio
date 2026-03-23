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
const player = document.getElementById("player");
const volume = document.getElementById("volume");

/* LOAD */
function loadSong(){
    audio.src = songs[i];
    name.innerText = songs[i].replace(".mp3","");
}

/* PLAY */
function play(){
    audio.play();
    btn.innerText="⏸";
}
function toggleMusic(){
    if(audio.paused) play();
    else{
        audio.pause();
        btn.innerText="▶";
    }
}

/* NEXT / PREV */
function nextSong(){
    i = Math.floor(Math.random()*songs.length);
    loadSong(); play();
}
function prevSong(){
    i = (i-1+songs.length)%songs.length;
    loadSong(); play();
}
function shuffleToggle(){}

/* PROGRESS */
audio.addEventListener("timeupdate",()=>{
    if(audio.duration){
        progress.style.width=(audio.currentTime/audio.duration)*100+"%";
    }
});

/* VOLUME */
volume.addEventListener("input",()=>{
    audio.volume = volume.value;
});

/* AUTOPLAY FIX */
document.addEventListener("click",()=>play(),{once:true});

/* LOAD */
window.onload=()=>{
    loadSong();
    setTimeout(()=>{
        document.getElementById("loader").style.display="none";
    },1000);
};

/* CURSOR */
const cursor=document.getElementById("cursor");
let mx=0,my=0,cx=0,cy=0;

document.addEventListener("mousemove",e=>{
    mx=e.clientX;
    my=e.clientY;

    const p=document.createElement("div");
    p.className="particle";
    p.style.left=e.clientX+"px";
    p.style.top=e.clientY+"px";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),300);
});

function animate(){
    cx+=(mx-cx)*0.2;
    cy+=(my-cy)*0.2;
    cursor.style.left=cx+"px";
    cursor.style.top=cy+"px";
    requestAnimationFrame(animate);
}
animate();

/* WAVE + BEAT SYNC */
const c=document.getElementById("wave");
const ctx=c.getContext("2d");
c.width=280; c.height=60;

function draw(){
    ctx.clearRect(0,0,280,60);

    let energy = Math.sin(Date.now()/150);

    for(let j=0;j<25;j++){
        let h = audio.paused ? 8 : (Math.sin(Date.now()/200 + j)*15+20);
        ctx.fillStyle="white";
        ctx.fillRect(j*10,60-h,6,h);
    }

    /* BEAT GLOW */
    if(!audio.paused && energy > 0.8){
        player.classList.add("beat");
    } else {
        player.classList.remove("beat");
    }

    requestAnimationFrame(draw);
}
draw();
