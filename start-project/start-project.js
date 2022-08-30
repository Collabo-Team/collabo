// import fetch utils functions
import { uploadAudio, newProject, updateTrack } from '../fetch-utils.js';

//DOM elements
const startForm = document.getElementById('start-project-form');

//form event listener
startForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(startForm);

    await newProject({
        name: data.get('project-name'),
        genre: data.get('genre'),
        tempo: data.get('tempo'),
        time_signature: data.get('time-signature'),
        key: data.get('key-signature'),
    });

    const trackUpload = {
        instrument: data.get('instrument')
    };

    const audioFile = data.get('audio-input');
    if (audioFile.size) {
        const audioName = `user-files/${Math.floor(Math.random() * 1000000)}${audioFile.name}`;
        const url = await uploadAudio(
            'files-bucket',
            audioName,
            audioFile
        );
        trackUpload.url = url;
        await updateTrack(trackUpload);

    }

    startForm.reset();


});