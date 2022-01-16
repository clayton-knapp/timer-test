import { 
    // checkAuth, 
    logout,
} from '../fetch-utils.js';


const logoutButton = document.getElementById('logout');
const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#start');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {

});

// display the duration in the div
// decrement the duration by one second every one second (1000ms)
// then go to next duration

let durations = [3, 4, 5];
// let duration = 3;

startButton.addEventListener('click', ()=> {
    for (let duration of durations) {
        while (duration > 0) {
            const timer = setInterval(() => {
                if (duration > 0) {
                    // write if statement so if <10 add 0 to display
                    timerDisplay.textContent = `00:${duration}`;
                    console.log(duration);
                } else if (duration === 0) {
                    clearInterval(timer);
                    console.log(duration);
                }
            }, 1000);
        }
    }
});

        // timerDisplay.textContent = `00:${duration}`;
        // const timer = setInterval(() => {
        //     if (duration > 0) {
        //         duration--;
        //             // write if statement so if <10 add 0 to display
        //         timerDisplay.textContent = `00:${duration}`;
        //         console.log(duration);
        //     } else if (duration === 0) {
        //         clearInterval(timer);
        //         console.log(duration);
        //     }
        // }, 1000);


// set interval calls decrement timer every 1000ms