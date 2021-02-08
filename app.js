let song = document.querySelector('#song');
let artist = document.querySelector('.song-artist');
let title = document.querySelector('.song-title');

const progressBar = document.querySelector('#progress-bar');

let thumbnail = document.querySelector('#thumbnail');
let bkg = document.querySelector('#background');

let playing = true;
let pPause = document.querySelector('#play-pause');



let songIndex = 0;
let songList = ["assets/songs/GetLucky.mp3", "assets/songs/joji.mp3", "assets/songs/Diwk.mp3", "assets/songs/chlorine.mp3"];
let songBKG = ["assets/background/ramBKG.jpg", "assets/background/jojiBKG.png", "assets/background/diwkBKG.jpg", "assets/background/chlorineBKG.jpg"];
let songTN = ["assets/thumbnails/ramTN.jpg", "assets/thumbnails/jojiTN.jpg", "assets/thumbnails/diwkTN.jpg", "assets/thumbnails/chlorineTN.jpg"];
let songArtist = ["Daft Punk", "Joji", "Arctic Monkey", "Twenty One Pilots"];
let songTitle = ["Get Lucky", "Dancing In The Dark", "Do I Wanna Know", "Chlorine"];

function playSong() {
    if (playing) {
        pPause.src = "icons/svg/010-pause.svg";
        thumbnail.style.transform = 'scale(1.1)';
        song.play();
        playing = false;
    } else {
        pPause.src = "icons/svg/014-play.svg";
        thumbnail.style.transform = "scale(1)";

        song.pause();
        playing = true;
    }
}

song.addEventListener('ended', () => {
    nextSong();
});

function nextSong() {
    songIndex++;
    if (songIndex >= songList.length) {
        songIndex = 0;
    }
    song.src = songList[songIndex];
    artist.innerHTML = songArtist[songIndex];
    title.innerHTML = songTitle[songIndex];
    thumbnail.src = songTN[songIndex];
    bkg.src = songBKG[songIndex];
    playing = true;
    playSong();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songList.length - 1;
    }
    song.src = songList[songIndex];
    artist.innerHTML = songArtist[songIndex];
    title.innerHTML = songTitle[songIndex];
    thumbnail.src = songTN[songIndex];
    bkg.src = songBKG[songIndex];
    playing = true;
    playSong();
}

function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value;
};
