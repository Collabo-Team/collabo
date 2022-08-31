// import fetch utils functions
import { uploadAudio, newProject, updateTrack, checkAuth } from '../fetch-utils.js';

checkAuth();

//DOM elements
const startForm = document.getElementById('start-project-form');

//form event listener
startForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(startForm);

    const response = await newProject({
        name: data.get('project-name'),
        genre: data.get('genre'),
        tempo: data.get('tempo'),
        time_signature: data.get('time-signature'),
        key: data.get('key-signature'),
    });
    const project = response.data;
    const trackUpload = {
        instrument: data.get('instrument')
    };

    const audioFile = data.get('audio-input');
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

    startForm.reset();


});

// const downloadButton = document.querySelector('.download');

// downloadButton.addEventListener('click', async () => {
//     await downloadTrack();
// });



