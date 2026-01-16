document.addEventListener("DOMContentLoaded", () => {

    let songIndex = 0;
    let audioElement = new Audio("./songs/song1.mp4");

    let masterPlay = document.getElementById("masterPlay");
    let myProgressBar = document.getElementById("myprogressbar");
    let next = document.getElementById("next");
    let previous = document.getElementById("previous");
    let gif = document.getElementById("gif");
    let songInfo = document.querySelector(".songinfo");

    gif.style.opacity = 0;

    // SONG LIST
    let songs = [
        { songName: "Haseen", filePath: "./songs/song1.mp4" },
        { songName: "Pal Pal", filePath: "./songs/song2.mp4" },
        { songName: "For A Reason", filePath: "./songs/song3.mp4" },
        { songName: "Softly", filePath: "./songs/song4.mp4" },
        { songName: "Maan Mera", filePath: "./songs/song5.mp4" },
        { songName: "Gal Sun", filePath: "./songs/song6.mp4" }
    ];

    let songItemPlays = Array.from(document.getElementsByClassName("songItemPlay"));

    const resetAllSongIcons = () => {
        songItemPlays.forEach(el => {
            el.classList.remove("fa-pause");
            el.classList.add("fa-play");
        });
    };

    // ▶ MASTER PLAY / PAUSE
    masterPlay.addEventListener("click", () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.replace("fa-play", "fa-pause");
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.replace("fa-pause", "fa-play");
            gif.style.opacity = 0;
        }
    });

    // 🎵 CLICK SONG FROM LIST
    songItemPlays.forEach(element => {
        element.addEventListener("click", (e) => {

            resetAllSongIcons();
            songIndex = parseInt(e.target.dataset.index);

            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();

            e.target.classList.replace("fa-play", "fa-pause");
            masterPlay.classList.replace("fa-play", "fa-pause");
            gif.style.opacity = 1;

            songInfo.lastChild.textContent = " " + songs[songIndex].songName;
        });
    });

    // ⏱ UPDATE PROGRESS BAR
    audioElement.addEventListener("timeupdate", () => {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress || 0;
    });

    // ⏩ SEEK
    myProgressBar.addEventListener("change", () => {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    });

    // ⏭ NEXT
    next.addEventListener("click", () => {
        songIndex = (songIndex + 1) % songs.length;

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        resetAllSongIcons();
        songItemPlays[songIndex].classList.replace("fa-play", "fa-pause");

        songInfo.lastChild.textContent = " " + songs[songIndex].songName;
        masterPlay.classList.replace("fa-play", "fa-pause");
        gif.style.opacity = 1;
    });

    // ⏮ PREVIOUS
    previous.addEventListener("click", () => {
        songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        resetAllSongIcons();
        songItemPlays[songIndex].classList.replace("fa-play", "fa-pause");

        songInfo.lastChild.textContent = " " + songs[songIndex].songName;
        masterPlay.classList.replace("fa-play", "fa-pause");
        gif.style.opacity = 1;
    });

    // 🔁 SONG END
    audioElement.addEventListener("ended", () => {
        gif.style.opacity = 0;
        masterPlay.classList.replace("fa-pause", "fa-play");
        resetAllSongIcons();
    });

});
