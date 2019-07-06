import {
    timer,
    skipEvent,
    startEvent,
    timerInputEvent,
    setStartingTime
} from './timer.js';

const updateClockFace = (uiTimerCount) => {

    let pieTimer = document.querySelector('.degree');
    let clockHandColor = '#1fbb39';
    let percentRatio = 0.277777777777778; //percentRatio is percentage per degree

    let percent = 100 - (timer.totalSeconds - uiTimerCount) / timer.totalSeconds * 100;
    let degree = percent / percentRatio;

    if (percent <= 100) {

        if (percent < 50) {

            degree += 90;
            pieTimer.style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, ${clockHandColor} 50%),
                    linear-gradient(90deg, ${clockHandColor} 50%, transparent 50%)`;
        } else if (percent === 50) {

            pieTimer.style.backgroundImage = `linear-gradient(90deg, ${clockHandColor} 50%, transparent 50%)`;
        } else {

            degree -= 90;
            pieTimer.style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, #ffffff 50%),
                    linear-gradient(90deg, ${clockHandColor} 50%, transparent 50%)`;
        }
    }
};

const resetTimerUI = () => {

    document.querySelector('.degree').style.backgroundImage = `background-image: none`;
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

    request.open('get', './components/timer/html/timer.html', true);
    request.responseType = 'document';
    request.send();
};

export {
    setMinutes,
    setSeconds,
    updateClockFace,
    resetTimerUI,
    renderTimer
};