
let paused = false;
let pauseClicked = false;
let time = {
    seconds: 60,
    minutes: 0,
    timerID: 0
};

const setMinutes = () => {

    if (time.minutes >= 0) {

        if (time.minutes == 0) {

            document.getElementById('minutes').innerHTML = '0' + time.minutes;
        }
        else {

            document.getElementById('minutes').innerHTML = time.minutes;
        }
    }
};

const setSeconds = () => {

    if (time.seconds >= 0) {

        if (time.seconds == 20) {

            document.getElementById('seconds').innerHTML = '00';
        }
        else if (time.seconds < 10) {

            document.getElementById('seconds').innerHTML = '0' + time.seconds;
        }
        else {

            document.getElementById('seconds').innerHTML = time.seconds;
        }
    }
};

const startPomodoro = () => {

    let button = document.getElementById('start');

    if (paused) {

        button.innerHTML = 'Start';
        stopTimer();
        paused = !paused;
        pauseClicked = true;
    }
    else {

        button.innerHTML = 'Pause';
        runTimer();
        paused = !paused;
    }
};

const stopTimer = () => {

    clearInterval(time.timerID);
}

const runSecondsTimer = () => {

    time.timerID = setInterval(() => {

        --time.seconds;
        setSeconds();
        
        if (time.seconds === 0) {

            time.seconds = 12;
            clearInterval(time.timerID);
            runTimer();
        }
    }, 1000);
};

const runTimer = () => {

    if (time.minutes > 0 && !pauseClicked) {

        --time.minutes;
        setMinutes();
        runSecondsTimer();
    }
    else if (time.minutes >= 0 && pauseClicked) {

        setMinutes();
        --time.minutes;
       runSecondsTimer();
    }
};

//Setup Event-Handlers
document.getElementById('start')
    .addEventListener('click', () => startPomodoro());

    document.getElementById('user-input')
    .addEventListener('change',(event)=> time.minutes = event.target.value);