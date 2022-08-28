// eslint-disable-next-line no-undef
var playlist = WaveformPlaylist.init({
    container: document.getElementById('playlist'),
    samplesPerPixel: 128,
    waveHeight: 100,
    timescale: true,
    state: 'cursor',
    colors: {
        waveOutlineColor: '#c78283',
    },
    zoomLevels: [128, 256, 512],
    controls: {
        show: true,
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
