const getBackgroundImage = () => {

    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {

        let response = JSON.parse(request.response);
        console.log(response);
        document.querySelector('html').style.backgroundImage = `url(${response.urls.regular})`;
    });

    request.open('get', 'https://api.unsplash.com/photos/random/?query=nature&orientation=landscape', true);
    request.setRequestHeader('Authorization', 'Client-ID 138d8ad9fa85d98c10db5d138b62b37be74b1120efc7f8649351ef318de6687f');
    request.send();
};

export {
    getBackgroundImage
};