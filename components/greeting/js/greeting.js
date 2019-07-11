const keyPressEvent = () => {

    let input = document.querySelector('.name-textbox');
    let startString = '';
    let paddedString = startString.padStart(5);
    input.textContent = paddedString;

    input.addEventListener('keyup', (e) => {

        if (input.textContent.length <= 0) {

            input.textContent = paddedString;
        }
    });

    input.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {

            input.setAttribute('contenteditable', false);
            document.getElementById('user-name').value = input.textContent;
        } else if (e.key !== 'Backspace') {

            input.textContent = input.textContent.trim();
        }
    });
};

const changeUserNameEvent = () => {

    let input = document.getElementById('user-name');
    let greetingTextBox = document.querySelector('.name-textbox');
    
    input.addEventListener('input', () => {

        greetingTextBox.textContent = input.value;
        greetingTextBox.setAttribute('contenteditable', false);
    });
}

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
        changeUserNameEvent();
    });
};

export {
    renderGreeting
};