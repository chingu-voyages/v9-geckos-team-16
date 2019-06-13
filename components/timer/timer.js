import * as timerUI from './timer-ui.js';
import * as timerQuery from './timer-queries.js';

let timer = {

    paused: false,
    pauseClicked: false,
    clockCount: 0,
    clockSeconds: 0,
    sessionCount: 0,
    breakInterval: 4,
    longBreakMinutes: 3,
    shortBreakMinutes: 1,
    sessionMinutes: 2,
    timerID: 0
};

let runningTimer = {

    sessionTimer: false,
    breakTimer: true
};

const decrementTimer = (timerMinutes) => {

    switch (timerMinutes.name) {
        case 'getSessionMinutes':
            --timer.sessionMinutes;
            break;
        case 'getBreakTimeMinutes':
            if (timer.sessionCount % timer.breakInterval === 0) {
                --timer.longBreakMinutes;
            } else {
                --timer.shortBreakMinutes;
            }
            break;
    }
};

const finishSession = () => {

    console.log('At finish sessions');
    timer.paused = false;
    timer.pauseClicked = false;
    timer.clockSeconds = 60;
    document.getElementById('start').innerHTML = 'Start';

    let inputs = document.getElementById('timer-input').querySelectorAll('input');

    for (let index = 0; index < inputs.length; index++) {

        const element = inputs[index];
        switch (element.id) {
            case 'session-minutes':
                timer.sessionMinutes = element.value;
                break;
            case 'long-break-minutes':
                timer.longBreakMinutes = element.value;
                break;
            case 'short-break-minutes':
                timer.shortBreakMinutes = element.value;
                break;
        }
    }
};

const addSessionCount = (timerMinutes) => {

    if (timerMinutes.name === 'getSessionMinutes') {
        ++timer.sessionCount;
        console.log(timer.sessionCount);
    }
};

const skipSession = (timerMinutes) => {

    clearInterval(timer.timerID);
    runningTimer.sessionTimer = !runningTimer.sessionTimer;
    runningTimer.breakTimer = !runningTimer.breakTimer;

    addSessionCount(timerMinutes);
    finishSession();
    timerUI.setMinutes(timerQuery.getCurrentTimer());
    timerUI.setSeconds();
};

const startSession = (timerMinutes) => {

    console.log(timerMinutes);
    let button = document.getElementById('start');

    if (timer.paused) {

        button.innerHTML = 'Start';
        pauseTimer();
        timer.paused = !timer.paused;
        timer.pauseClicked = true;
    } else {

        button.innerHTML = 'Pause';
        runMinutesTimer(timerMinutes);
        timer.paused = !timer.paused;
    }
};

const pauseTimer = () => {

    clearInterval(timer.timerID);
};

const runSecondsTimer = (timerMinutes) => {

    timer.timerID = setInterval(() => {

        ++timer.clockCount;
        //timerUI.updateClockFace(timer.clockCount);
        timerUI.updateBarTimer(timer.clockCount);

        --timer.clockSeconds;
        timerUI.setSeconds();

        if (timer.clockSeconds === 0) {

            clearInterval(timer.timerID);

            if (timerMinutes() === 0) {

                addSessionCount(timerMinutes);
                finishSession();
            } else if (timerMinutes() > 0) {

                timer.clockSeconds = 60;

                if (timer.pauseClicked) {

                    decrementTimer(timerMinutes);
                    runMinutesTimer(timerMinutes);
                } else if (!timer.pauseClicked) {

                    runMinutesTimer(timerMinutes);
                }
            }
        }
    }, 1000);
};

const runMinutesTimer = (timerMinutes) => {

    if (!timer.pauseClicked) {

        decrementTimer(timerMinutes);
        timerUI.setMinutes(timerMinutes);
        runSecondsTimer(timerMinutes);
    } else if (timer.pauseClicked) {

        timerUI.setMinutes(timerMinutes);
        runSecondsTimer(timerMinutes);
    }
};

//Setup Event-Handlers

const skipEvent = document.getElementById('skip')
    .addEventListener('click', (event) => {

        skipSession(timerQuery.getCurrentTimer());
    });

const startEvent = document.getElementById('start')
    .addEventListener('click', (event) => {

        if (timer.clockSeconds === 0) {

            timer.clockSeconds = 60;
            runningTimer.sessionTimer = !runningTimer.sessionTimer;
            runningTimer.breakTimer = !runningTimer.breakTimer;
        }

        startSession(timerQuery.getCurrentTimer());
    });

const timerInputEvent = document.getElementById('timer-input')
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
                timer.shortBreakMinutes = input.value;
                break;
            case 'session-minutes':
                timer.sessionMinutes = input.value;
                break;
            case 'break-interval':
                timer.breakInterval = input.value;
                break;
        }
    });

export {
    skipEvent,
    startEvent,
    timerInputEvent,
    timer,
    runningTimer
};