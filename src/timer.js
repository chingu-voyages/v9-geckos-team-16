{
    let paused = false;
    let pauseClicked = false;

    let timer = {

        seconds: 0,
        sessionCount: 0,
        breakInterval: 4,
        longBreakMinutes: 3,
        shortBreakMinutes: 1,
        sessionMinutes: 2,
        timerID: 0
    };

    let runningTimer = {

        sessionTimer: false,
        breakTimer: true
    };

    const decrementTimer = (callback) => {

        switch (callback.name) {
            case 'getSessionMinutes':
                --timer.sessionMinutes;
                break;
            case 'getBreakTimeMinutes':
                if (timer.sessionCount % timer.breakInterval === 0) {
                    --timer.longBreakMinutes;
                }
                else {
                    --timer.shortBreakMinutes;
                }
                break;
        }
    };

    const finishSession = () => {

        console.log('At finish sessions');
        paused = false;
        pauseClicked = false;
        document.getElementById('start').innerHTML = 'Start';

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

    const addSessionCount = (callback) => {

        if (callback.name === 'getSessionMinutes') {
            ++timer.sessionCount;
            console.log(timer.sessionCount);
        }
    };

    const skipSession = (callback) => {

        clearInterval(timer.timerID);
        addSessionCount(callback);

        timer.seconds = 60;
        runningTimer.sessionTimer = !runningTimer.sessionTimer;
        runningTimer.breakTimer = !runningTimer.breakTimer;
        finishSession();
        setMinutes(getCurrentTimer());
        setSeconds();
    };

    const getCurrentTimer = () => {

        let callback;

        if (runningTimer.sessionTimer) {

            console.log('session');
            callback = getSessionMinutes;
        }
        else if (runningTimer.breakTimer) {

            console.log('breaktime');
            callback = getBreakTimeMinutes;
        }

        return callback;
    }

    const getSessionMinutes = () => {

        return timer.sessionMinutes;
    };

    const getBreakTimeMinutes = () => {

        if (timer.sessionCount % timer.breakInterval === 0) {

            return timer.longBreakMinutes;
        }
        else {

            return timer.shortBreakMinutes;
        }
    };

    const setMinutes = (callback) => {

        if (callback() >= 0) {

            if (callback() == 0) {

                document.getElementById('clock-minutes').innerHTML = '0' + callback();
            }
            else {

                document.getElementById('clock-minutes').innerHTML = callback();
            }
        }
    };

    const setSeconds = () => {

        if (timer.seconds >= 0) {

            if (timer.seconds === 60) {
                document.getElementById('clock-seconds').innerHTML = '00';
            }
            else if (timer.seconds < 10) {

                document.getElementById('clock-seconds').innerHTML = '0' + timer.seconds;
            }
            else {

                document.getElementById('clock-seconds').innerHTML = timer.seconds;
            }
        }
    };

    const startSession = (callback) => {

        console.log(callback);
        let button = document.getElementById('start');

        if (paused) {

            button.innerHTML = 'Start';
            stopTimer();
            paused = !paused;
            pauseClicked = true;
        }
        else {

            button.innerHTML = 'Pause';
            runMinutesTimer(callback);
            paused = !paused;
        }
    };

    const stopTimer = () => {

        clearInterval(timer.timerID);
    }

    const runSecondsTimer = (callback) => {

        timer.timerID = setInterval(() => {

            --timer.seconds;
            setSeconds();

            if (timer.seconds === 0) {

                clearInterval(timer.timerID);

                if (callback() === 0) {

                    addSessionCount(callback);
                    finishSession();
                }
                else if (callback() > 0) {

                    timer.seconds = 60;

                    if (pauseClicked) {

                        decrementTimer(callback);
                        runMinutesTimer(callback);
                    }
                    else if (!pauseClicked) {

                        runMinutesTimer(callback);
                    }
                }
            }
        }, 1000);
    };

    const runMinutesTimer = (callback) => {

        if (!pauseClicked) {

            decrementTimer(callback);
            setMinutes(callback);
            runSecondsTimer(callback);
        }
        else if (pauseClicked) {

            setMinutes(callback);
            runSecondsTimer(callback);
        }
    };

    //Setup Event-Handlers

    document.getElementById('skip')
        .addEventListener('click', (event) => {

            skipSession(getCurrentTimer());
        });

    document.getElementById('start')
        .addEventListener('click', (event) => {

            if (timer.seconds === 0) {

                timer.seconds = 60;
                runningTimer.sessionTimer = !runningTimer.sessionTimer;
                runningTimer.breakTimer = !runningTimer.breakTimer;
            }

            startSession(getCurrentTimer());
        });

    document.getElementById('timer-input')
        .addEventListener('change', (event) => {

            let input = event.target;

            if (input.value < 1) {
                input.value = 1;
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

}