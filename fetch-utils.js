const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTk0MzkyNSwiZXhwIjoxOTU3NTE5OTI1fQ.dMDJyeCZHko9Vr6qrLp-UfzKQF3xQowPC6N4NhcuHMA';

const SUPABASE_URL = 'https://dndlkewbungoynpztwzf.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function fetchRoutines() {
    const response = await client
        .from('routines')
        .select('*, exercises (*)');

    return checkError(response);
}

export async function fetchExercises(routineId) {
    const response = await client
        .from('junction')
        .select('*, exercises (*, routines (*))')
        .match({ routine_id: routineId });

    return checkError(response);
}



// TEMPLATE FUNCTIONS

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
