import { getProject, uploadAudio, updateTrack } from '../fetch-utils.js';


// eslint-disable-next-line no-undef
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
    .then(function () {
        var ee = playlist.getEventEmitter();
        document.getElementById('play-button').addEventListener('click', function () {
            ee.emit('play');
        });

        document.getElementById('pause-button').addEventListener('click', function () {
            ee.emit('pause');
        });
    });

// HORIZONTAL SCROLLING INSIDE WAVEFORM
const container = document.querySelector('.playlist-tracks');
container.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
        container.scrollLeft += 100;
        e.preventDefault();
    } else {
        container.scrollLeft -= 100;
        e.preventDefault();
    }
});


// RENDER PROJECT
export function renderProject(project) {
    const div = document.createElement('div');
    // const div = document.createDocumentFragment();

    const h2 = document.createElement('h2');
    h2.classList.add('project-name');

    const metadataDiv = document.createElement('div');
    metadataDiv.classList.add('track-metadata');

    const genre = document.createElement('p');
    const tempo = document.createElement('p');
    const timeSignature = document.createElement('p');
    const key = document.createElement('p');


    h2.textContent = project.name;
    genre.textContent = project.genre;
    tempo.textContent = project.tempo;
    timeSignature.textContent = project.time_signature;
    key.textContent = project.key;

    metadataDiv.append(genre, tempo, timeSignature, key);
    div.append(h2, metadataDiv);

    // console.log(renderProject(19));
    return div;
}

// The function below is for displaying the project detail page
// it feeds data from the fetch util into the render util
// and prepends it to the audio-buttons HTML element

async function displayProjectById(projectId) {

    // const audioButtons = document.getElementById('audio-buttons');
    const projectContainer = document.getElementById('project-container');

    const loadProject = await getProject(projectId);

    const newProject = renderProject(loadProject);

    // audioButtons.prepend(newProject);
    projectContainer.append(newProject);
}

// calling the displayProjectById function to keep squiggles away until 
// we link to the rest of the project files 
displayProjectById(19);


// UPLOAD TRACK FORM
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(uploadForm);
    // const audioInput = formData.get('audio-input');
    // const instrument = formData.get('instrument');
    const project = await getProject(project);
    
    console.log(project);

    const trackUpload = {
        instrument: formData.get('instrument')
    };

    const audioFile = formData.get('audio-input');
    if (audioFile.size) {
        const audioName = `${project.id}/${Math.floor(Math.random() * 1000000)}${audioFile.name}`;
        const url = await uploadAudio(
            'files-bucket',
            audioName,
            audioFile
        );
        trackUpload.folder = audioName;
        trackUpload.url = url;
        trackUpload.project_id = project.id;
        await updateTrack(trackUpload);

    }


    // const response = await audioUpload(audioInput, instrument);

    uploadForm.reset();

    // console.log(audioInput, instrument);

    // const error = response.error;

    // if (error) {
    //     console.log(error.message);
    // } else {
    //     displayProject();
    // }
});

