import * as timerUI from './timer-ui.js';
import * as timerQuery from './timer-queries.js';
import * as appBackground from '../../appBackground/js/appBackground.js';
import * as appQuote from '../../appQuotes/js/quotes.js';

let timer = {

    paused: false,
    currentMinutes: 0,
    currentSeconds: 0,
    uiTimerCount: 0,
    clockTotal: 0,
    totalSeconds: 0,
    sessionCount: 0,
    breakInterval: 4,
    longBreakMinutes: 15,
    shortBreakMinutes: 5,
    sessionMinutes: 25,
    timerID: 0
};

let runningTimer = {

    sessionTimer: true,
    breakTimer: false
};

const minutesToSeconds = (timerMinutes) => {

    return timerMinutes() * 60;
};

const updateTimerInputs = (input) => {

    let changedInput = '';
    let keys = Object.keys(timer);

    switch (input.id) {
        case 'long-break-minutes':

            timer.longBreakMinutes = input.value;
            changedInput = keys.find(key => key === 'longBreakMinutes');
            break;
        case 'short-break-minutes':

            timer.shortBreakMinutes = input.value;
            changedInput = keys.find(key => key === 'shortBreakMinutes');
            break;
        case 'session-minutes':

            timer.sessionMinutes = input.value;
            changedInput = keys.find(key => key === 'sessionMinutes');
            break;
        case 'break-interval':

            timer.breakInterval = input.value;
            changedInput = keys.find(key => key === 'breakInterval');
            break;
    }

    let currentTimer = timerQuery.getCurrentTimerKey();

    if (changedInput === currentTimer) {

        clearInterval(timer.timerID);
        timerUI.resetTimerUI();
        resetTimerCounter();
        setStartingTime();
    }
};

const finishSession = (timerMinutes) => {

    addSessionCount(timerMinutes);
    runningTimer.sessionTimer = !runningTimer.sessionTimer;
    runningTimer.breakTimer = !runningTimer.breakTimer;

    //reset all counters
    timerUI.resetTimerUI();
    resetTimerCounter();
    setStartingTime();

    appBackground.getBackgroundImage();
    appQuote.showQuote();

    let inputs = document.getElementById('timer-input').querySelectorAll('input');

    for (let index = 0; index < inputs.length; index++) {

        const input = inputs[index];
        updateTimerInputs(input);
    }
};

const addSessionCount = (timerMinutes) => {

    if (timerMinutes.name === 'getSessionMinutes') {

        ++timer.sessionCount;
    }
};

const skipSession = (timerMinutes) => {

    clearInterval(timer.timerID);
    finishSession(timerMinutes);
    timerUI.setMinutes(timerQuery.getCurrentTimer());
    timerUI.setSeconds(timer.currentSeconds);
};

const startSession = (timerMinutes) => {

    let button = document.getElementById('start');

    timer.currentMinutes = Math.floor(timer.clockTotal / 60);
    timer.currentSeconds = timer.clockTotal % 60;
    timerUI.setMinutes(timerQuery.getCurrentMinutes);
    timerUI.setSeconds(timer.currentSeconds);

    if (timer.paused) {

        button.textContent = 'Start';
        pauseSession();
        timer.paused = !timer.paused;
    } else {

        button.textContent = 'Pause';
        runSecondsTimer(timerMinutes);
        timer.paused = !timer.paused;
    }
};

const pauseSession = () => {

    clearInterval(timer.timerID);
};

const runSecondsTimer = (timerMinutes) => {

    timer.timerID = setInterval(() => {

        --timer.clockTotal;
        ++timer.uiTimerCount;
        timer.currentMinutes = Math.floor(timer.clockTotal / 60);
        timer.currentSeconds = timer.clockTotal % 60;

        timerUI.setMinutes(timerQuery.getCurrentMinutes);
        timerUI.setSeconds(timer.currentSeconds);
        timerUI.updateClockFace(timer.uiTimerCount);

        if (timer.clockTotal < 0) {

            clearInterval(timer.timerID);
            finishSession(timerMinutes);
        }
    }, 1000);
};

const resetTimerCounter = () => {

    document.getElementById('start').textContent = 'Start';
    timer.paused = false;
    timer.uiTimerCount = 0;
    timer.currentMinutes = 0;
    timer.currentSeconds = 0;
};

const setStartingTime = () => {

    timer.totalSeconds = minutesToSeconds(timerQuery.getCurrentTimer());
    timer.clockTotal = timer.totalSeconds;
    timerUI.setMinutes(timerQuery.getCurrentTimer());
    timerUI.setSeconds(timer.currentSeconds);
};

//Setup Event-Handlers
const skipEvent = () => {

    document.getElementById('skip')
        .addEventListener('click', (event) => {

            skipSession(timerQuery.getCurrentTimer());
        });
};

const startEvent = () => {

    document.getElementById('start')
        .addEventListener('click', (event) => {

            startSession(timerQuery.getCurrentTimer());
        });
};

const timerInputEvent = () => {

    document.getElementById('timer-input')
        .addEventListener('change', (event) => {

            let input = event.target;

            if (input.id !== 'break-interval') {

                if (input.value < 1) {

                    input.value = 1;
                } else if (input.value > 60) {

                    input.value = 60;
                }
            } else {
                if (input.value < 2) {

                    input.value = 2;
                } else if (input.value > 8) {

                    input.value = 8;
                }
            }

            updateTimerInputs(input);
        });
};

export {
    setStartingTime,
    skipEvent,
    startEvent,
    timerInputEvent,
    timer,
    runningTimer
};