import { 
    checkAuth, 
    logout,
    fetchRoutines
 } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const routinesListEl = document.querySelector('#routine-list');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() => {
    fetchAndDisplayRoutines();
});

async function fetchAndDisplayRoutines() {
    const routines = await fetchRoutines();
    console.log(routines);

    routinesListEl.textContent = '';
    for (let routine of routines) {
        const routineEl = document.createElement('div');
        const routineName = document.createElement('h2');
        const routineDuration = document.createElement('h3');


        // loop through exercices and add duration of each
        let totalDuration = 0;
        for (let exercise of routine.exercises) {
            totalDuration = totalDuration + exercise.duration;
        }

        routineDuration.textContent = `${(totalDuration / 60)} minutes`;
        routineName.textContent = routine.name;
        routineEl.classList.add('routine');

        routineEl.addEventListener('click', async() => {
            location.replace(`../routine-detail/?id=${routine.id}`);
        });

        routineEl.append(routineName, routineDuration);

        routinesListEl.append(routineEl);
    }
}