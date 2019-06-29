import {
    timer,
    skipEvent,
    startEvent,
    timerInputEvent,
    setTotalSeconds
} from './timer.js';

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
    let barTimer = document.querySelector('.bar');
    
    if (percent > 50) {
        barTimer.style.backgroundImage = `linear-gradient(to right,#1fbb39 ${percent}%,#ffffff ${100 - percent}%)`;
    } else {
        barTimer.style.backgroundImage = `linear-gradient(to left,#ffffff ${100-percent}%,#1fbb39 ${percent}% )`;
    } 
};

const resetBarTimer = () => {

    document.querySelector('.bar').style.backgroundImage = 'linear-gradient(#1fbb39,#1fbb39)';
};

const setMinutes = (callback) => {

    let minutes = callback();
    if (minutes >= 0) {

        if (minutes < 10) {

            document.getElementById('clock-minutes').textContent = '0' + minutes;
        } else {

            document.getElementById('clock-minutes').textContent = minutes;
        }
    }
};

const setSeconds = (seconds) => {

    if (seconds >= 0) {

        if (seconds === 60) {

            document.getElementById('clock-seconds').innerHTML = '00';
        } else if (timer.clockTotal < 10) {

            document.getElementById('clock-seconds').innerHTML = '0' + seconds;
        } else {

            document.getElementById('clock-seconds').innerHTML = seconds;
        }
    }
};

const renderTimer = () => {

    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {

        let response = request.response;
        let container = document.getElementById('timer-container');
        
        //remove all children first before appending
        while (container.firstChild) {
            container.firstChild.remove();
        }

        container.append(response.querySelector('div'));
        setTotalSeconds();
        startEvent();
        skipEvent();
        timerInputEvent();
    });

    request.open('get','./components/timer/html/timer.html',true);
    request.responseType = 'document';
    request.send();
};

export {
    setMinutes,
    setSeconds,
    updateClockFace,
    updateBarTimer,
    resetBarTimer,
    renderTimer
};