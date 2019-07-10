const renderGreeting = () => {

    let request = new XMLHttpRequest();

    request.responseType = 'document';
    request.open('get', './components/greeting/html/greeting.html', true);
    request.send();

    request.addEventListener('load', () => {

        let response = request.response;
        let container = document.getElementById('greeting-container');

        while (container.firstChild) {
            container.firstChild.remove();
        }

        container.append(response.querySelector('div'));
    });
};

export {
    renderGreeting
};