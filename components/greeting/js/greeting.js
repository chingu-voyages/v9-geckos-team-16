const keyPressEvent = () => {

    let input = document.querySelector('span.name-textbox');
    let startString = '';
    let paddedString = startString.padStart(5).padEnd(5);
    input.textContent = paddedString;

    input.addEventListener('keyup', (e) => {

        if (e.key === 'Backspace' && input.textContent.length <= 1) {

            input.textContent = paddedString;
        }
    });

    input.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {

            input.setAttribute('contenteditable', false);
        } else if (e.key !== 'Backspace') {

            input.textContent = input.textContent.trim();
        }
    });
};

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
        keyPressEvent();
    });
};

export {
    renderGreeting
};