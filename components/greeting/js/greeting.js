const keyPressEvent = () => {

    let input = document.querySelector('.name-textbox');
    let startString = '    ';
    input.textContent = startString;

    input.addEventListener('keyup', (e) => {

        if (input.textContent.length <= 0) {

            input.textContent = startString;
        }
    });

    input.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {

            input.setAttribute('contenteditable', false);
            document.getElementById('user-name').value = input.textContent;
        } else {

            //Fix for firefox browsers - the trim function works differently on it, the behavior is as intended on Edge and Chrome
            //the three statements after calling trim guarantees the cursor is at the end of the element
            //TODO - this fix above breaks the left and right arrow keys 
            if (typeof InstallTrigger !== 'undefined') {

                input.textContent = input.textContent.trim();
                input.focus();
                document.execCommand('selectAll', false, null);
                document.getSelection().collapseToEnd();
            } else {

                input.textContent = input.textContent.trim();
            }
        }
    });
};

const changeUserNameEvent = () => {

    let input = document.getElementById('user-name');
    let greetingTextBox = document.querySelector('.name-textbox');

    input.addEventListener('change', () => {

        greetingTextBox.textContent = input.value;
        greetingTextBox.setAttribute('contenteditable', false);
    });
};

const setGreetingText = () => {

    let today = new Date();
    let currentHour = today.getHours();
    let greetingText;

    //Text is dependent on the hour of the 24hour clock
    if (currentHour >= 6 && currentHour < 13) {

        greetingText = 'Morning';
    } else if (currentHour >= 13 && currentHour < 18) {

        greetingText = 'Afternoon';
    } else if (currentHour >= 18 || currentHour <= 5) {

        greetingText = 'Evening';
    }

    document.querySelector('.time-textbox').textContent = greetingText;
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
        changeUserNameEvent();

        //set the greeting text, and check it every 5 minutes
        setGreetingText();
        setInterval(setGreetingText, 300000);
    });
};

export {
    renderGreeting
};