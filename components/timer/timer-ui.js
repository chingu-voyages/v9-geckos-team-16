import {
    timer
} from './timer.js';

let barTimer = document.querySelector('.bar');

const updateClockFace = (percent) => {

    //TODO - this function is still broken, only works on a 60 second count, can delete it later on if I can't figure out how to implement the clock
    
    let degree = 0;
    let totalSeconds = 60;

    if (percent < (totalSeconds / 2)) {

        degree = 360 / 100 * percent;
        document.querySelector('.pie').style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
    } else if (percent >= (totalSeconds / 2)) {

        degree = -90 + (360 * percent / totalSeconds);
        document.querySelector('.pie').style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, #1fbb39 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
    }
};

const updateBarTimer = (uiTimerCount) => {

    let percent = (timer.totalSeconds - uiTimerCount) / timer.totalSeconds * 100;
    barTimer.style.backgroundImage = `linear-gradient(to right,#1fbb39 ${percent}%,#ffffff ${100 - percent}%)`;
};

const resetBarTimer = () => {

    barTimer.style.backgroundImage = 'linear-gradient(#1fbb39,#1fbb39)';
};

const setMinutes = (timerMinutes) => {

    if (timerMinutes() >= 0) {

        if (timerMinutes() < 10) {

            document.getElementById('clock-minutes').innerHTML = '0' + timerMinutes();
        } else {

            document.getElementById('clock-minutes').innerHTML = timerMinutes();
        }
    }
};

const setSeconds = () => {

    if (timer.clockSeconds >= 0) {

        if (timer.clockSeconds === 60) {

            document.getElementById('clock-seconds').innerHTML = '00';
        } else if (timer.clockSeconds < 10) {

            document.getElementById('clock-seconds').innerHTML = '0' + timer.clockSeconds;
        } else {

            document.getElementById('clock-seconds').innerHTML = timer.clockSeconds;
        }
    }
};

export {
    setMinutes,
    setSeconds,
    updateClockFace,
    updateBarTimer,
    resetBarTimer
};