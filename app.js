// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, getProjects } from './fetch-utils.js';
import { renderProject } from './render-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
// checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
// const signOutLink = document.getElementById('sign-out-link');
// signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const projectsListEl = document.getElementById('projects-container');
// local state:

// display functions:

async function displayProjects() {
    
    projectsListEl.textContent = '';

    const projects = await getProjects();
    console.log('projects', projects);

    for (let project of projects) {
        const projectEl = renderProject(project);
        
        projectsListEl.append(projectEl);
    }
}

displayProjects();

// events:
