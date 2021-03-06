


const logoutButton = document.getElementById('logout');
const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#start');
const currentExercise = document.querySelector('#current-exercise');

logoutButton.addEventListener('click', () => {
    // logout();
});

window.addEventListener('load', async() => {

});

let i = 0;

const routine = [
    {
        name: 'Pushups',
        duration: 3
    },
    {
        name: 'Crunches',
        duration: 4
    },
    {
        name: 'Jumping Jacks',
        duration: 5
    }
];
// console.log(routine[0].duration);

// timerDisplay.textContent = `00:${duration}`;

startButton.addEventListener('click', ()=> {

    // calls the first timer function (i=0)
    timerDisplayFunc(routine, i);

    // starts a timeOut function for i=0 duration
    timeoutFunc(routine, i);
});



// FUNCTIONS

function timerDisplayFunc(array, i) {

    // copy it so we arent mutating the original array?
    let countdownTime = routine[i].duration; 

    //log the starting countdown time
    console.log('countdown:', countdownTime);

    // display current exercise index
    currentExercise.textContent = `You are on exercise: ${routine[i].name}`;

    //display duration
    if (countdownTime >= 10) {
        timerDisplay.textContent = `00:${countdownTime}`;
    } else if (countdownTime <= 9) {
        timerDisplay.textContent = `00:0${countdownTime}`;
    }

    // const timer = setInterval(() => {

    setInterval(() => {
        if (countdownTime > 0) {
            //decrement the display time
            countdownTime--;

            // display new duration
            if (countdownTime >= 10) {
                timerDisplay.textContent = `00:${countdownTime}`;
            } else if (countdownTime <= 9) {
                timerDisplay.textContent = `00:0${countdownTime}`;
            }

            //log the countdown
            console.log('countdown:', countdownTime);
        } 
        else if (countdownTime <= 0) {
            // countdownTime--;

            // if (countdownTime >= 10) {
            //     timerDisplay.textContent = `00:${countdownTime}`;
            // } else if (countdownTime <= 9) {
            //     timerDisplay.textContent = `00:0${countdownTime}`;
            // }
            clearInterval();
            // clearInterval(timer);
        }
    }, 1000);
}


function timeoutFunc(array, i) {
    setTimeout(() => {
        // logs out the number of seconds passed
        console.log(`it's been ${array[i].duration} seconds`);

        //increments the index
        i++;

        //logs next index
        console.log('NEXT DURATION INDEX: i:', i);

        // check if i < array length
        // and only execute nested timeOut if it is, otherwise it will break out not execute and break out
        if (i < array.length) {
            // calls the next timer (i+1) here
            timerDisplayFunc(array, i);
            
            // CALLS THE FUNCTION WITHIN ITSELF PASSING SAME ARRAY AND NEW INDEX WHICH WILL EXECUTE AT THE THE END OF THIS FUNCTION (AFTER THE INTERVAL) AND TRIGGER A TIMEOUT FOR THE NEXT DURATION (THIS IS RECURSION)
            timeoutFunc(array, i);
        } else {
            currentExercise.textContent = 'WORKOUT COMPLETE!';
        }

    }, array[i].duration * 1000);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REFACTORED A BIT

const timer2Display = document.querySelector('#timer2');
const start2Button = document.querySelector('#start2');
const stop2Button = document.querySelector('#stop2');

const durationsExample = [8, 9, 10];
// let i = 0;

let timer;
let waitTime;

start2Button.addEventListener('click', ()=> {
    intervalAndTimeout(durationsExample, i);
});

stop2Button.addEventListener('click', ()=> {
    clearInterval(timer);
    clearTimeout(waitTime);
});


function intervalAndTimeout(durations, i) {

    //DISPLAYS INITIAL DURATION
    if (durations[i] >= 10) {
        timer2Display.textContent = `00:${durations[i]}`;
    } else if (durations[i] <= 9) {
        timer2Display.textContent = `00:0${durations[i]}`;
    }

    console.log('i: ', i);

    // RUNS TIMER FOR THAT DURATION - LOOPS FUNC EVERY 1 SEC
    // let remainingTime = durations[i];
    timer = setInterval(decrementAndDisplayTime, 1000, durations, i);

    //SETS TIMEOUT FOR DURATION of i, then increments i, and re-runs function (recursion)
    waitTime = setTimeout(()=>{
        i++;
        intervalAndTimeout(durations, i); // RECURSION HERE
    }, (durations[i] * 1000) + 1000);
}

function decrementAndDisplayTime(durations, i) {
    if (durations[i] > 0) {
            //decrement the display time
        durations[i]--;

            // display new duration
        if (durations[i] >= 10) {
            timer2Display.textContent = `00:${durations[i]}`;
        } else if (durations[i] <= 9) {
            timer2Display.textContent = `00:0${durations[i]}`;
        }

            //log the countdown
        console.log('countdown:', durations);
    }
}


///////////////////////////////////////////////////////////////


const timer3Display = document.querySelector('#timer3');
const start3Button = document.querySelector('#start3');

const durationsExample2 = [3, 4, 5, 6];
// let i = 0;

start3Button.addEventListener('click', ()=> {
    timerFunction(durationsExample2);
});

let timeoutDuration = 0;

function timerFunction(durationsArray){


    durationsArray.map((eachDuration, index) => {
        // calculate timeout duration based on index

        // for first element execute immediately with no timeout
        if (index === 0) {
            timeoutDuration = -1;
        }
        else if (index > 0) {
            //then the used time out duration accumulates each time.
            timeoutDuration += eachDuration;
        }

        setTimeout(()=>{
            displayTimeLeft(eachDuration);
            
            setInterval(decrementAndDisplayTime2, 1000, durationsArray, index);
        }, (timeoutDuration * 1000 + 1000));
        
        console.log(timeoutDuration);

    });


}



function decrementAndDisplayTime2(durations, i) {
    if (durations[i] > 0) {
        //decrement the display time
        durations[i]--;

        // display new duration
        displayTimeLeft(durations[i]);

            //log the countdown
        console.log('countdown:', durations);
    }
}

function displayTimeLeft(eachDuration) {
    if (eachDuration >= 10) {
        timer3Display.textContent = `00:${eachDuration}`;
    } else if (eachDuration <= 9) {
        timer3Display.textContent = `00:0${eachDuration}`;
    }
}