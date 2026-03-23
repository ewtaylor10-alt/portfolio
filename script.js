const songs = [
    { file: "05 Let Down - Remastered.mp3", name: "Let Down" },
    { file: "Dominic Fike - white keys - wurlighost (128k).mp3", name: "White Keys" },
    { file: "Britney Spears - Gimme More.mp3", name: "Gimme More" },
    { file: "RAYE - Escapism. feat. 070 Shake.mp3", name: "Escapism" },
    { file: "SpotiDownloader.com - Champa.mp3", name: "Champagne Coast" },
    { file: "Tate McRae - Sports Car.mp3", name: "Sports Car" },
    { file: "Tate McRae - TIT FOR TAT.mp3", name: "Tit For Tat" },
    { file: "The Kid LAROI - NIGHTS LIKE THIS (lyrics).mp3", name: "Nights Like This" }
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
    cover.src = "c0bba8165dbb9982fa17e300d66f8264.jpg";

    playBtn.innerText = "⏸";
}

function nextSong(){ currentSong=(currentSong+1)%songs.length; playSong(currentSong); }
function prevSong(){ currentSong=(currentSong-1+songs.length)%songs.length; playSong(currentSong); }

function toggleMusic(){
    if(audio.paused) playSong(currentSong);
    else { audio.pause(); playBtn.innerText="▶"; }
}

audio.addEventListener("timeupdate",()=>{
    if(audio.duration){
        progress.style.width=(audio.currentTime/audio.duration)*100+"%";
    }
});

volume.addEventListener("input",()=> audio.volume=volume.value);

/* AUTOPLAY */
document.addEventListener("click",()=>{ if(audio.paused) playSong(currentSong); },{once:true});

/* CURSOR + TRAIL */
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    document.body.appendChild(trail);

    setTimeout(()=> trail.remove(), 300);
});
