const getBackgroundImage = () => {

    let searchTerm = [
        'nature',
        'wildlife',
        'cat',
        'stars',
        'wolf',
        'ocean',
        'dog',
        'tree',
        'tiger',
        'lion',
        'desert',
        'penguin',     
        'mountain',
        'eagle',
        'river',
        'forest'    
    ];
    let index = Math.floor(Math.random() * searchTerm.length);
    let category = searchTerm[index];
    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {

        let response = JSON.parse(request.response);
        document.querySelector('body').style.backgroundImage = `url(${response.urls.regular})`;
        
        let footerLink = document.querySelector('ul span').firstElementChild;
        footerLink.setAttribute('href',`https://unsplash.com/@${response.user.username}?utm_source=ChinguGecko16&utm_medium=referral`);
        footerLink.innerText = response.user.name;
    });
    
    request.open('get', `https://api.unsplash.com/photos/random/?query=${category}&orientation=landscape`, true);
    request.setRequestHeader('Authorization', 'Client-ID 138d8ad9fa85d98c10db5d138b62b37be74b1120efc7f8649351ef318de6687f');
    request.send();
};

export {
    getBackgroundImage
};