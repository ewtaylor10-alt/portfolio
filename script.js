const songs = [
{file:"05 Let Down - Remastered.mp3", name:"Let Down"},
{file:"Britney Spears - Gimme More.mp3", name:"Gimme More"},
{file:"Dominic Fike - white keys - wurlighost (128k).mp3", name:"White Keys"},
{file:"RAYE - Escapism. feat. 070 Shake.mp3", name:"Escapism"},
{file:"SpotiDownloader.com - Champagne Coast - Blood Orange.mp3", name:"Champagne Coast"},
{file:"Tate McRae - Sports Car.mp3", name:"Sports Car"},
{file:"Tate McRae - TIT FOR TAT.mp3", name:"Tit For Tat"},
{file:"The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3", name:"Nights Like This"}
];

let index = Math.floor(Math.random()*songs.length);
let shuffle = true;

const audio = document.getElementById("audio");
const name = document.getElementById("songName");
const progress = document.getElementById("progress");

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const volume = document.getElementById("volume");

/* LOAD */
function loadSong(){
    audio.src = songs[index].file;
    name.innerText = songs[index].name;
}

/* PLAY */
function playSong(){
    audio.play();
    playBtn.innerText = "⏸";
}

/* PAUSE */
function pauseSong(){
    audio.pause();
    playBtn.innerText = "▶";
}

/* CONTROLS */
playBtn.onclick = ()=> audio.paused ? playSong() : pauseSong();

nextBtn.onclick = ()=>{
    index = shuffle
        ? Math.floor(Math.random()*songs.length)
        : (index+1)%songs.length;
    loadSong();
    playSong();
};

prevBtn.onclick = ()=>{
    index = (index-1+songs.length)%songs.length;
    loadSong();
    playSong();
};

shuffleBtn.onclick = ()=>{
    shuffle = !shuffle;
    shuffleBtn.style.opacity = shuffle ? "1" : "0.4";
};

/* PROGRESS */
audio.ontimeupdate = ()=>{
    if(audio.duration){
        progress.style.width = (audio.currentTime/audio.duration)*100 + "%";
    }
};

document.querySelector(".progress-bar").onclick = (e)=>{
    audio.currentTime =
        (e.offsetX / e.currentTarget.clientWidth) * audio.duration;
};

/* VOLUME */
volume.oninput = ()=> audio.volume = volume.value;

/* AUTO NEXT */
audio.onended = ()=> nextBtn.click();

/* LOADER */
window.onload = ()=>{
    loadSong();
    setTimeout(()=> document.getElementById("loader").style.display="none",800);
};

/* AUTOPLAY FIX */
document.body.addEventListener("click", ()=>{
    if(audio.paused) playSong();
},{once:true});

/* MOUSE GLOW */
document.addEventListener("mousemove", e=>{
    const glow = document.getElementById("cursorGlow");
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});
