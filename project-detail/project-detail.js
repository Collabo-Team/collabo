const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');

// eslint-disable-next-line no-undef
const sound1 = new Howl({
    src: ['../assets/audio-demos/demo-1/guitar.mp3'],
    preload: true,
});
// eslint-disable-next-line no-undef
const sound2 = new Howl({
    src: ['../assets/audio-demos/demo-1/bass.mp3'],
    preload: true,
});
// eslint-disable-next-line no-undef
const sound3 = new Howl({
    src: ['../assets/audio-demos/demo-1/drums.mp3'],
    preload: true,
});

function playAll() {
    sound1.play();
    sound2.play();
    sound3.play();
}

function pauseAll() {
    sound1.pause();
    sound2.pause();
    sound3.pause();
}

function stopAll() {
    sound1.stop();
    sound2.stop();
    sound3.stop();
}

playButton.addEventListener('click', () =>{
    playAll();
    playButton.style.backgroundColor = 'lightgreen';
    pauseButton.style.backgroundColor = 'rgb(217, 217, 217)';
    stopButton.style.backgroundColor = 'rgb(217, 217, 217)';
});

pauseButton.addEventListener('click', () =>{
    pauseAll();
    playButton.style.backgroundColor = 'rgb(217, 217, 217)';
    pauseButton.style.backgroundColor = 'grey';
    stopButton.style.backgroundColor = 'rgb(217, 217, 217)';
});

stopButton.addEventListener('click', () => {
    stopAll();
    playButton.style.backgroundColor = 'rgb(217, 217, 217)';
    pauseButton.style.backgroundColor = 'rgb(217, 217, 217)';
    stopButton.style.backgroundColor = 'tomato';
});
