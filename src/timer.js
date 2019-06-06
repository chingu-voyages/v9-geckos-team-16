
let paused = false;
let pauseClicked = false;
let timer = {

    seconds: 60,
    breakInterval: 0,
    longBreakMinutes: 0,
    shortBreakMnutes: 0,
    sessionMinutes: 0,
    timerID: 0
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

            timer.seconds = 60;
            clearInterval(timer.timerID);
            if (timer.sessionMinutes >= 0) {
                runTimer();
            }
        }
    }, 1000);
};

const runTimer = () => {

    if (timer.sessionMinutes > 0 && !pauseClicked) {

        --timer.sessionMinutes;
        setMinutes();
        runSecondsTimer();
    }
    else if (pauseClicked) {

        setMinutes();
        --timer.sessionMinutes;
        runSecondsTimer();
    }
};

//Setup Event-Handlers
document.getElementById('start')
    .addEventListener('click', () => startPomodoro());

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