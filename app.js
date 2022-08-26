// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser } from './fetch-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:

// local state:

// display functions:

// events:
