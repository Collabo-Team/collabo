import { updateProfile, uploadProfilePhoto } from '../fetch-utils.js';

const profileForm = document.getElementById('profile-form');
const changeType = profileForm.querySelector('a');
const errorDisplay = profileForm.querySelector('.error');
const uploadPhoto = profileForm.querySelector('#upload-photo');
const updateButton = profileForm.querySelector('#update-button');



const params = new URLSearchParams(location.search);
const redirectUrl = params.get('redirectUrl') || '../';

// const user = getUser();
// if (!user) location.replace('../');

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(profileForm);
    
    const response = {
        first_name: data.get('first-name-input'),
        last_name: data.get('last-name-input'),
        user_name: data.get('user-name'),
        bio: data.get('bio'),
    };

    const imageFile  = data.get('image-file');

    if (imageFile.size) {
        const path = `profile-images/${Math.floor(Math.random() * 1000000)}${imageFile.name}`;
        console.log('path', path)
        const url = await uploadProfilePhoto('files-bucket', path, imageFile);
        response.image_file = url;
    };

     await updateProfile(response);

     profileForm.reset();
});

    // const response = await updateProfile( {
    //     first_name: data.get('first-name-input'),
    //     last_name: data.get('last-name-input'),
    //     user_name: data.get('user-name'),
    //     bio: data.get('bio'),
        
    // });
    
    // const profileUpdate = response.data;
    // const photoName = {
        
    // };
    
   
    //     console.log('response', response);
    //     response.image_file = path;
    //     // photoName.url = url;
    //     await updateProfile(photoName);
    // }
    //     profileForm.reset();

    //     // window.location.replace('../');
    // });






