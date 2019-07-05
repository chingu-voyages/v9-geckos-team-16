import {
    timer,
    skipEvent,
    startEvent,
    timerInputEvent,
    setStartingTime
} from './timer.js';

const updateClockFace = (uiTimerCount) => {

    //base is percentage per degree: 0.27777% per degree 
    let percent = (timer.totalSeconds - uiTimerCount) / timer.totalSeconds * 100;
    let base = 0.277777777777778;
    let pieTimer = document.querySelector('.pie');
    let degree = percent / base;
 
    if (percent > 50) {
        
        pieTimer.style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
    } else {

        pieTimer.style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, #1fbb39 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
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
        } else if (seconds < 10) {

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

        //register events after adding the HTML elements to the DOM
        container.append(response.querySelector('div'));
        setStartingTime();
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