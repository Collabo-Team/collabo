// importing other stuff, utility functions for:
// working with supabase:
import {
    checkAuth, signOutUser, getUser, getProjects, getProfiles, getProfile
    // getProfile, getProfileImage
} from './fetch-utils.js';
import { renderProject } from './render-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
// checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const projectsListEl = document.getElementById('projects-container');

// display all projects on home page
async function displayProjects() {
    projectsListEl.textContent = '';

    const projects = await getProjects();

    for (let project of projects) {

        // const profileImg = await getProfile(project.created_by);

        const projectEl = renderProject(project);

        // projectEl.append(profileImg);
        
        projectsListEl.append(projectEl);
    }

    const avatar = document.querySelector('.avatar');

    console.log('avatar', avatar);
    const profiles = await getProfiles();
    
    for (let profile of profiles) {
        console.log('profile', profile);
        const profileImg = await getProfile(profile.image_file);

        console.log('profile.image_file', profile.image_file);

        // avatar.textContent = profileImg;
        projectsListEl.append(profileImg);
    }
}

displayProjects();

window.addEventListener('click', () => {
    checkAuth();
});

window.addEventListener('load', () => {
    const signOut = document.getElementById('sign-out-link');
    const user = getUser();

    if (user) {
        signOut.textContent = 'Sign-Out';

    } else {
        signOut.textContent = 'Sign-In';
    }
});

