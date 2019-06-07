let paused = false;
let pauseClicked = false;
let timer = {

    seconds: 10,
    breakInterval: 4,
    sessionCount: 0,
    longBreakMinutes: 15,
    shortBreakMnutes: 5,
    sessionMinutes: 2,
    timerID: 0
};

let runningTimer = {

    sessionTimer: false,
    shortBreakTimer: false,
    longBreakTimer: false
};

const setMinutes = () => {

    if (timer.sessionMinutes >= 0) {

        if (timer.sessionMinutes == 0) {

            document.getElementById('clock-minutes').innerHTML = '0' + timer.sessionMinutes;
        }
        else {

            document.getElementById('clock-minutes').innerHTML = timer.sessionMinutes;
        }
    }
};

const setSeconds = () => {

    if (timer.seconds >= 0) {

        if (timer.seconds < 10) {

            document.getElementById('clock-seconds').innerHTML = '0' + timer.seconds;
        }
        else {

            document.getElementById('clock-seconds').innerHTML = timer.seconds;
        }
    }
};

const startPomodoro = () => {

    let button = document.getElementById('start');

    if (paused) {

        button.innerHTML = 'Start';
        stopTimer();
        paused = !paused;
        pauseClicked = true;
    }
    else {

        button.innerHTML = 'Pause';
        runTimer();
        paused = !paused;
    }
};

const stopTimer = () => {

    clearInterval(timer.timerID);
}

const runSecondsTimer = () => {

    timer.timerID = setInterval(() => {

        --timer.seconds;
        setSeconds();

        if (timer.seconds === 0) {

            timer.seconds = 10;
            clearInterval(timer.timerID);

            if (timer.sessionMinutes > 0) {

                if (pauseClicked) {
                    
                    --timer.sessionMinutes;
                    runTimer();
                }
                else if (!pauseClicked) {
                    
                    runTimer();
                }
                
                if (timer.sessionMinutes === 0) {

                    ++timer.sessionCount;
                    console.log(timer.sessionCount);
                }
            }
        }
    }, 1000);
};

const runTimer = () => {

    if (!pauseClicked) {

        --timer.sessionMinutes;
        setMinutes();
        runSecondsTimer();
    }
    else if (pauseClicked) {

        setMinutes();
        runSecondsTimer();
    }
};

//Setup Event-Handlers
document.getElementById('start')
    .addEventListener('click', (event) => {


        startPomodoro();
    });

document.getElementById('timer-input')
    .addEventListener('change', (event) => {

        let input = event.target;

        if (input.value < 1) {
            input.value = 1;
        }

        switch (input.id) {
            case 'long-break-minutes':
                timer.longBreakMinutes = input.value;
                break;
            case 'short-break-minutes':
                timer.shortBreakMnutes = input.value;
                break;
            case 'session-minutes':
                timer.sessionMinutes = input.value;
                break;
            case 'break-interval':
                timer.breakInterval = input.value;
                break;
        }
    });