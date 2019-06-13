import {
    timer,
    runningTimer
} from './timer.js';

const getCurrentTimer = () => {

    let callback;

    if (runningTimer.sessionTimer) {

        console.log('session');
        callback = getSessionMinutes;
    } else if (runningTimer.breakTimer) {

        console.log('breaktime');
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

const getCurrentSeconds = () => {

    return timer.currentSeconds;
};

export {
    getCurrentTimer,
    getSessionMinutes,
    getBreakTimeMinutes,
    getCurrentMinutes,
    getCurrentSeconds
};