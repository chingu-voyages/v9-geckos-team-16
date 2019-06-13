import {timer} from './timer.js';

let pieTime = document.getElementById('pieTime');
let totalSeconds = 60;
let count = parseInt(pieTime.innerText);
let timerID = 0;

const updateTimer = (percent) => {

    let degree = 0;

    if (percent < (totalSeconds / 2)) {

        degree = 90 + (360 * percent / totalSeconds);
        document.querySelector('.pie').style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
    } else if (percent >= (totalSeconds / 2)) {

        degree = -90 + (360 * percent / totalSeconds);
        document.querySelector('.pie').style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, #1fbb39 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
    }
};

const setMinutes = (timerMinutes) => {

    if (timerMinutes() >= 0) {

        if (timerMinutes() == 0) {

            document.getElementById('clock-minutes').innerHTML = '0' + timerMinutes();
        } else {

            document.getElementById('clock-minutes').innerHTML = timerMinutes();
        }
    }
};

const setSeconds = () => {

    if (timer.seconds >= 0) {

        if (timer.seconds === 60) {
            document.getElementById('clock-seconds').innerHTML = '00';
        } else if (timer.seconds < 10) {

            document.getElementById('clock-seconds').innerHTML = '0' + timer.seconds;
        } else {

            document.getElementById('clock-seconds').innerHTML = timer.seconds;
        }
    }
};

const startPieTimer = function () {

    timerID = setInterval(() => {

        count += 1;
        pieTime.innerHTML = count;
        updateTimer(count);

        if (count == totalSeconds) {
            clearInterval(timerID);
        }

    }, 1000);
};

const stopPieTimer = function () {
    clearInterval(timerID);
};

export {
    setMinutes,
    setSeconds,
    startPieTimer,
    stopPieTimer
};