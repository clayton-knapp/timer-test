import { 
    checkAuth, 
    logout,
    fetchExercises
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const exercisesListEl = document.querySelector('#exercises-list');
const routineName = document.querySelector('#routine-name');
const routineInfo = document.querySelector('#routine-info');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() => {
    fetchAndDisplayExercises();
});

async function fetchAndDisplayExercises() {
    const params = new URLSearchParams(window.location.search);
    const routineId = params.get('id');

    const exercises = await fetchExercises(routineId);
    console.log(exercises);

    exercisesListEl.textContent = '';
    let totalDuration = 0;
    let exerciseCount = 0;
    for (let exercise of exercises) {
        const exerciseEl = document.createElement('div');
        const exerciseName = document.createElement('h2');
        const exerciseDuration = document.createElement('h3');


        // loop through exercices and add duration of each
        totalDuration = totalDuration + exercise.exercises.duration;
        exerciseCount++;


        exerciseDuration.textContent = `${exercise.exercises.duration} seconds`;
        exerciseName.textContent = exercise.exercises.name;
        exerciseEl.classList.add('exercise');

        exerciseEl.addEventListener('click', async() => {
            // window.location.replace = `../routine-detail/?id=${routine.id}`;
        });

        exerciseEl.append(exerciseName, exerciseDuration);

        exercisesListEl.append(exerciseEl);
    }

    // HOW TO GET THE ROUTINE NAME???
    // routineName.textContent = 
    routineInfo.textContent = `${exerciseCount} Exercises - ${totalDuration / 60} minutes`;


}