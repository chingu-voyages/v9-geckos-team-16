{
    let time = document.getElementById('time');
    let totalSeconds = 60; 
    let count = parseInt(time.innerText);

    const update = (percent) => {
        let degree = 0;

        if (percent < (totalSeconds / 2)) {
            
            degree = 90 + (360 * percent / totalSeconds);
            document.querySelector('.pie').style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
        } else if (percent >= (totalSeconds / 2)) {
           
            degree = -90 + (360 * percent / totalSeconds);
            document.querySelector('.pie').style.backgroundImage = `linear-gradient(${degree}deg, transparent 50%, #1fbba6 50%),linear-gradient(90deg, white 50%, transparent 50%)`;
        }
    };

  
    myCounter = setInterval(() => {

        count += 1;
        time.innerHTML = count;
        update(count);

        if (count == totalSeconds) {
           
            clearInterval(myCounter);
        }
    }, 1000);
}