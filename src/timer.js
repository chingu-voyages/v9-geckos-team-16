

const minToSeconds = (time) => {
    return time * 60;
};

const sessionDuration = minToSeconds(10);

const runTimer = () => {
    setInterval(() => {
        console.log(new Date().toUTCString());
    }, 1000);
};