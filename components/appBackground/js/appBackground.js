const getBackgroundImage = () => {

    let searchTerm = [
        'animals',
        'nature',
        'wildlife',
        'cat',
        'lion',
        'penguin',
        'trees',
        'mountains',
        'eagle'
    ];
    let index = Math.floor(Math.random() * Math.floor(9));
    let category = searchTerm[index];
    let request = new XMLHttpRequest();
    
    request.addEventListener('load', () => {

        let response = JSON.parse(request.response);
        document.querySelector('body').style.backgroundImage = `url(${response.urls.regular})`;
    });
    request.open('get', `https://api.unsplash.com/photos/random/?query=${category}&orientation=landscape`, true);
    request.setRequestHeader('Authorization', 'Client-ID 138d8ad9fa85d98c10db5d138b62b37be74b1120efc7f8649351ef318de6687f');
    request.send();
};

export {
    getBackgroundImage
};