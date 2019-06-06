
let paused = false;
let pauseClicked = false;
let time = {
    seconds: 5,
    minutes: 3,
    timerID: 0
};

const setMinutes = (time) => {

    document.getElementById('minutes').innerHTML = time;
};

const setSeconds = (time) => {

    if (time < 10) {

        document.getElementById('seconds').innerHTML = '0' + time;
    }
    else {

        document.getElementById('seconds').innerHTML = time;
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

const runTimer = () => {

    console.log(time.minutes);
    console.log(time.seconds);

    if (time.minutes >= 0) {

        if (!pauseClicked) {
            --time.minutes;
        }

        time.timerID = setInterval(() => {

            --time.seconds;

            if (time.minutes >= 0) {
                setMinutes(time.minutes);
            }

            if (time.seconds >= 0) {
                setSeconds(time.seconds);
            }
            
            if (time.seconds <= 0) {

                if (pauseClicked) {
                    --time.minutes;
                }

                time.seconds = 5;
                clearInterval(time.timerID);
                runTimer();
            }

        }, 1000);
    }
};

//Setup Event-Handlers
document.getElementById('start')
    .addEventListener('click', () => startPomodoro());