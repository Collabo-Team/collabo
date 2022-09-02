const SUPABASE_URL = 'https://lhopwipdeoyzrdkhgnll.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxob3B3aXBkZW95enJka2hnbmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE0NDUxMDEsImV4cCI6MTk3NzAyMTEwMX0.CqslQ0D0NOtKTdAzI7cJ1mdy_MBewH_F_jVzrMWaNvg';

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
export async function newProject(project) {
    return await client.from('projects').insert(project).single();
}

export async function updateTrack(track) {
    return await client.from('tracks').insert(track);
}

export async function uploadAudio(bucketName, audioName, audioFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(audioName, audioFile, {
        cacheControl: '3600',

        upsert: true,
    });

    if (response.error) {
        console.log(response.error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

export async function getTrack(folderName) {
    return await client.storage.from('files-bucket').download(folderName);
}

export async function getTracksByProject(project_id) {
    const response = await client.from('tracks').select('*').match({ project_id });
    return response.data;
}

export function updateTrackInRealtime(handleInsert, playlist, project_id) {
    client
        .from(`tracks:project_id=eq.${project_id}`)
        .on('INSERT', (e) => {
            playlist.load([{ src: e.new.url, name: e.new.instrument }]);
        })
        .subscribe();
}

export async function getProject(id) {
    // from the roster table, select a single player who has the matching id
    const response = await client.from('projects').select('*, tracks(*)').match({ id }).single();
    // and return the response
    if (response.error) {
        throw new Error(response.error.message);
    }
    return response.data;
}

export async function getProjects() {
    const response = await client.from('projects').select('*');
    return response.data;
}

// PROFILE FETCH FNS

// export async function createProfile(profile) {
//     return await client.from('profiles').insert(profile).single();
// }

export async function updateProfile(profile, id) {
    return await client.from('profiles').upsert(profile).match({ id }).single();
}

export async function getProfile(id) {
    return await client.from('profiles').select('*').match({ id }).single();
}

export async function uploadProfilePhoto(bucketName, fileName, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(fileName, imageFile, {
        cacheControl: '3600',

        upsert: true,
    });

    if (response.error) {
        console.log(response.error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}