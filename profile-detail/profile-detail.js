import { updateProfile, uploadProfilePhoto } from "../fetch-utils";

const profileForm = document.getElementById('profile-form');
const changeType = profileForm.querySelector('a');
const errorDisplay = profileForm.querySelector('.error');
const uploadPhoto = profileForm.querySelector('#upload-photo');
const updateButton = profileForm.querySelector('#update-button');



const params = new URLSearchParams(location.search);
const redirectUrl = params.get('redirectUrl') || '../';

const user = getUser();
if (!user) location.replace('../');

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(profileForm);
    const response = await updateProfile( {
        firstname: data.get('first-name-input'),
        lastname: data.get('last-name-input'),
        address: data.get('address-input'),
        email: data.get('profile-email'),
        password: data.get('password-input')
    });
    
    const profileUpdate = response.data;
    const photoName = {
        alias: data.get('image-name')
        
    };
    
    const imageFile  = {
        image: data.get('image-file'),
    };
    if (imageFile.image) {
        const path = `${profileUpdate.id}/${Math.floor(Math.random() * 1000000)}${imageFile.name})`;
        const url = await uploadProfilePhoto('files-bucket', path, imageFile);

        photoName.folder = path;
        photoName.url = url;
        await updateProfile(photoName);
    }
        profileForm.reset();

        window.location.replace('../');
    });

   

//  
})







