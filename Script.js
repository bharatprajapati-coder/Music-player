let songIndex = 0;

let audioElement = new Audio("song/1.mp3")
let Startbtn = document.getElementById("Startbtn");
let myprogressbar = document.getElementById("ProgressBar");
let firstSong = document.getElementById("Firstsong");
let songInfo = Array.from(document.getElementsByClassName("songinfo"));
let hoveredElements = document.querySelectorAll('.songItemPlay');
let songs = [
    { songName: "Unstoppable!", filepath: "song/1.mp3" },
    { songName: "Heart Stereo.", filepath: "song/2.mp3" },
    { songName: "Dark side", filepath: "song/3.mp3" },
    { songName: "Dum dum da da", filepath: "song/4.mp3" },
    { songName: "Bloddy mary", filepath: "song/5.mp3" },
    { songName: "Believer!", filepath: "song/6.mp3" },
];


// let stopbtn = document.getElementById("Stopbtn");
Startbtn.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        Startbtn.classList.remove("fa-play-circle");
        Startbtn.classList.add("fa-pause-circle");
        let partsOfAudio = audioElement.src.split('/').splice('.');
        let songIndex = parseInt(partsOfAudio[4].split('.')[0]) - 1;

        hoveredElements[songIndex].classList.remove("fa-play-circle");
        hoveredElements[songIndex].classList.add('fa-pause-circle');

    }
    else {
        audioElement.pause();
        Startbtn.classList.remove("fa-pause-circle");
        Startbtn.classList.add("fa-play-circle");
        let partsOfAudio = audioElement.src.split('/').splice('.');
        let songIndex = parseInt(partsOfAudio[4].split('.')[0]) - 1;
        hoveredElements[songIndex].classList.remove("fa-pause-circle");
        hoveredElements[songIndex].classList.add('fa-play-circle');
    }
})

audioElement.addEventListener("timeupdate", () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    ProgressBar.value = progress;
    myprogressbar.style.background = `linear-gradient(to right, #fc6464 ${progress}%, #2c2e34 ${progress}%)`;

});

for (let i = 0; i < hoveredElements.length; i++) {
    hoveredElements[i].addEventListener('mouseover', () => {
        hoveredElements[i].style.cursor = "pointer";
    });
}

myprogressbar.addEventListener("click", () => {
    audioElement.currentTime = (audioElement.duration * ProgressBar.value) / 100;
});


songInfo.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});



// let songItemPlaybtn = ;

const converPauseToPlay = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add('fa-play-circle');
    })
}



Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        let time = (audioElement.currentTime / audioElement.duration) * 100
        if (e.target.classList[2] === "fa-pause-circle") {
            e.target.classList.remove("fa-pause-circle")
            e.target.classList.add("fa-play-circle")
            audioElement.pause();
            time = (audioElement.duration * ProgressBar.value) / 100;
            audioElement.currentTime = (audioElement.duration * ProgressBar.value) / 100;
            Startbtn.classList.remove("fa-pause-circle");
            Startbtn.classList.add("fa-play-circle");

        }
        else {
            converPauseToPlay();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `song/${songIndex + 1}.mp3`;
            audioElement.currentTime = time;
            audioElement.play();
            Startbtn.classList.remove("fa-play-circle");
            Startbtn.classList.add("fa-pause-circle");
            firstSong.innerHTML = songs[songIndex].songName;
        }

    })
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.currentTime = 0;

    Startbtn.classList.remove("fa-play-circle");
    Startbtn.classList.add("fa-pause-circle");
    firstSong.innerHTML = songs[songIndex - 1].songName;
    if (songIndex < 6) {
        audioElement.src = `song/${songIndex + 1}.mp3`;
        audioElement.play();
        hoveredElements[songIndex].classList.remove("fa-play-circle");
        hoveredElements[songIndex].classList.add("fa-pause-circle");
        hoveredElements[songIndex - 1].classList.remove("fa-pause-circle");
        hoveredElements[songIndex - 1].classList.add("fa-play-circle");
        firstSong.innerHTML = songs[songIndex].songName;
    }
    else {
        audioElement.src = `song/${1}.mp3`;
        audioElement.play();
        hoveredElements[0].classList.remove("fa-play-circle");
        hoveredElements[0].classList.add("fa-pause-circle");
        hoveredElements[5].classList.remove("fa-pause-circle");
        hoveredElements[5].classList.add("fa-play-circle");
        firstSong.innerHTML = songs[0].songName;
    }
})

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex - 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    Startbtn.classList.remove("fa-play-circle");
    Startbtn.classList.add("fa-pause-circle");
    firstSong.innerHTML = songs[songIndex].songName;
})