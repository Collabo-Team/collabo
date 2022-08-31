import { getProject, uploadAudio, updateTrack, getTrack, getTracksByProject } from '../fetch-utils.js';
import { checkAuth } from '../fetch-utils.js';

checkAuth();

// eslint-disable-next-line no-undef
const playlist = WaveformPlaylist.init({
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

// let renderedPlaylist = {
//     src: '',
//     name: ''
// };

//const tracks = getTracks()
// for (let track of tracks) {
    // playlist.track.src = `${track.src}`
    // playlist.track.name = `${track.}
    
    
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
    
const projectContainer = document.getElementById('project-container');
    
    // const audioButtons = document.getElementById('audio-buttons');
    
    // calling the displayProjectById function to keep squiggles away until 
    // we link to the rest of the project files 
    
let project = null;
    
    
    // UPLOAD TRACK FORM
const uploadForm = document.getElementById('upload-form');

function downloadBlob(blob, instrument) {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = project.name + '-' + instrument + '.mp3';
    a.click();
    window.URL.revokeObjectURL(url);
}
                
async function downloadTrack(track) {
                    
    const response = await getTrack(track.folder);
    const blob = response.data;
    downloadBlob(blob, track.instrument);
}
                
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', async () => {
    Promise.all(project.tracks.map(downloadTrack));
                    // const file = await getTrack();
                    
                    //set to a variable blob, and then access blob.property
});
                
                
const params = new URLSearchParams(window.location.search);
async function loadDetails() {
    project = await getProject(params.get('id'));
    const projectDisplay = renderProject(project);
    projectContainer.append(projectDisplay);
    displayTracks(project.tracks);
}

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
    
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
        uploadForm.reset();
    });
       
loadDetails();
    
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
    
async function displayTracks(tracks) {
    const loadList = [];
    for (const track of tracks) {
        loadList.push({ src: track.url, name: track.instrument });
    }
      
    await playlist.load(loadList);             
    const ee = playlist.getEventEmitter();
    playButton.addEventListener('click', () => {
        ee.emit('play');
    });
            
    pauseButton.addEventListener('click', () => {
        ee.emit('pause');
    });
}

//listen for insert on track table with project id of current project.
//listening on a table linked by a foreign key
//on track, take information and feed it into
//projects.tracks.push
//playlist.track.load
// playlist.load([{ src: '../assets/audio-demos/demo-1/drums.mp3',
// name: 'Drums' }]);
