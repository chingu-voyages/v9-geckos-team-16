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
    longBreakMinutes: 3,
    shortBreakMinutes: 1,
    sessionMinutes: 2,
    timerID: 0
};

let runningTimer = {

    sessionTimer: true,
    breakTimer: false
};

const minutesToSeconds = (timerMinutes) => {

    console.log(timerMinutes);

    return timerMinutes() * 60;
};

const finishSession = (timerMinutes) => {

    console.log('At finish sessions');
    timer.paused = false;
    timer.uiTimerCount = 0;
    timer.clockTotal = 0;
    timer.totalSeconds = 0;
    timer.currentMinutes = 0;
    timer.currentSeconds = 0;
    
    addSessionCount(timerMinutes);
    runningTimer.sessionTimer = !runningTimer.sessionTimer;
    runningTimer.breakTimer = !runningTimer.breakTimer;
    timerUI.resetBarTimer();
    setTotalSeconds();
    document.getElementById('start').innerHTML = 'Start';
    appBackground.getBackgroundImage();
    appQuote.getRandomQuote();

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
        console.log('added session count');
        console.log(timer.sessionCount);
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

        button.innerHTML = 'Start';
        pauseSession();
        timer.paused = !timer.paused;
    } else {

        button.innerHTML = 'Pause';
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
        timerUI.updateBarTimer(timer.uiTimerCount);

        if (timer.clockTotal < 0) {

            clearInterval(timer.timerID);           
            finishSession();
        }
    }, 1000);
};

//Setup Event-Handlers
const setTotalSeconds = function () {

    document.getElementById('start')
        .addEventListener('click', (event) => {

            console.log('at trigger-once event');

            timer.totalSeconds = minutesToSeconds(timerQuery.getCurrentTimer());
            timer.clockTotal = timer.totalSeconds;
            console.log(timer.totalSeconds);
        }, {
            once: true
        });
};

const skipEvent = document.getElementById('skip')
    .addEventListener('click', (event) => {

        skipSession(timerQuery.getCurrentTimer());
    });

const startEvent = document.getElementById('start')
    .addEventListener('click', (event) => {

        startSession(timerQuery.getCurrentTimer());
    });

const timerInputEvent = document.getElementById('timer-input')
    .addEventListener('change', (event) => {

        let input = event.target;

        if (input.value < 1) {
            input.value = 1;
        } else if (input.value > 60) {
            input.value = 60;
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
    setTotalSeconds,
    skipEvent,
    startEvent,
    timerInputEvent,
    timer,
    runningTimer
};