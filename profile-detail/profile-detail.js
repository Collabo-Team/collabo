import { updateProfile, uploadProfilePhoto } from '../fetch-utils.js';

const profileForm = document.getElementById('profile-form');
// const params = new URLSearchParams(location.search);

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(profileForm);

    const response = {
        first_name: data.get('first-name-input'),
        last_name: data.get('last-name-input'),
        user_name: data.get('user-name'),
        bio: data.get('bio'),
    };

    const imageFile = data.get('image-file');

    if (imageFile.size) {
        const path = `profile-images/${Math.floor(Math.random() * 1000000)}${imageFile.name}`;
        // console.log('path', path);
        const url = await uploadProfilePhoto('files-bucket', path, imageFile);
        response.image_file = url;
    }

    await updateProfile(response);

    profileForm.reset();
});
