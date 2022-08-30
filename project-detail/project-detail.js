// eslint-disable-next-line no-undef
import { downloadTrack } from '../fetch-utils.js';

var playlist = WaveformPlaylist.init({
    container: document.getElementById('playlist'),
    samplesPerPixel: 1000,
    waveHeight: 100,
    timescale: true,
    state: 'cursor',
    // seekStyle: 'line',
    isAutomaticScroll: true,
    colors: {
        waveOutlineColor: '#c78283',
    },
    zoomLevels: [128, 256, 512, 1000],
    controls: {
        show: true,
        width: 220,
    },
});

playlist
    .load([
        {
            src: '../assets/audio-demos/demo-1/guitar.mp3',
            name: 'Guitar',
        },
        {
            src: '../assets/audio-demos/demo-1/bass.mp3',
            name: 'Bass',
        },
        {
            src: '../assets/audio-demos/demo-1/drums.mp3',
            name: 'Drums',
        },
    ])
    .then(function() {
        var ee = playlist.getEventEmitter();
        document.getElementById('play-button').addEventListener('click', function() {
            ee.emit('play');
        });

        document.getElementById('pause-button').addEventListener('click', function() {
            ee.emit('pause');
        });
    });

// HORIZONTAL SCROLLING INSIDE WAVEFORM
const container = document.querySelector('.playlist-tracks');
container.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {
        container.scrollLeft += 100;
        e.preventDefault();
    } else {
        container.scrollLeft -= 100;
        e.preventDefault();
    }
});

// UPLOAD TRACK FORM
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(uploadForm);
    const audioInput = formData.get('audio-input');
    const instrument = formData.get('instrument');

    // const response = await audioUpload(audioInput, instrument);

    uploadForm.reset();

    console.log(audioInput, instrument);

    // const error = response.error;

    // if (error) {
    //     console.log(error.message);
    // } else {
    //     displayProject();
    // }
});

});
