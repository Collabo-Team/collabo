// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, getUser, getProjects } from './fetch-utils.js';
import { renderProject } from './render-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
// checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', async () => {
    await signOutUser();
});
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const projectsListEl = document.getElementById('projects-container');

// display all projects on home page
async function displayProjects() {
    
    projectsListEl.textContent = '';

    const projects = await getProjects();
    for (let project of projects) {
        const projectEl = renderProject(project);
        projectsListEl.append(projectEl);
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
