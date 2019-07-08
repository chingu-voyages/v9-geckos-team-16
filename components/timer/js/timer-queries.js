import {
    timer,
    runningTimer
} from './timer.js';

const getCurrentTimer = () => {

    let callback;

    if (runningTimer.sessionTimer) {

        callback = getSessionMinutes;
    } else if (runningTimer.breakTimer) {

        callback = getBreakTimeMinutes;
    }

    return callback;
};

const getSessionMinutes = () => {

    return timer.sessionMinutes;
};

const getBreakTimeMinutes = () => {

    if (timer.sessionCount % timer.breakInterval === 0) {

        return timer.longBreakMinutes;
    } else {

        return timer.shortBreakMinutes;
    }
};

const getCurrentMinutes = () => {

    return timer.currentMinutes;
};

const getCurrentTimerKey = () => {

    let key = '';

    if (runningTimer.sessionTimer) {

        key = 'sessionMinutes';
    } else if (runningTimer.breakTimer) {

        if (timer.sessionCount % timer.breakInterval === 0) {

            key = 'longBreakMinutes';
        } else {

            key = 'shortBreakMinutes';
        }
    }

    return key;
};

export {
    getCurrentTimer,
    getSessionMinutes,
    getBreakTimeMinutes,
    getCurrentMinutes,
    getCurrentTimerKey
};