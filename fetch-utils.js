const SUPABASE_URL = 'https://lhopwipdeoyzrdkhgnll.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxob3B3aXBkZW95enJka2hnbmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE0NDUxMDEsImV4cCI6MTk3NzAyMTEwMX0.CqslQ0D0NOtKTdAzI7cJ1mdy_MBewH_F_jVzrMWaNvg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function downloadAllTracksByProjectId(project_id) {
    return await client.from('tracks').select('*').match({ project_id }).download(`user-files/${tracks.url}`);
}
    
    // returns a blob
    // iterate through tracks and open a new browser tab for each track
// }
