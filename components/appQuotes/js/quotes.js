let quotes = [
    'There are many ways of going forward, but only one way of standing still.',
    'Adopt the pace of nature: her secret is patience.',
    'Real knowledge is to know the extent of one\'s ignorance.',
    'People may hear your words, but they feel your attitude.',
    'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    'The difference between average people and achieving people is their perception of and response to failure.',
    'Always bear in mind that your own resolution to succeed is more important than any other.',
    'It does not matter how slowly you go as long as you do not stop.',
    'Study the past, if you would divine the future.',
    'Life is really simple, but we insist on making it complicated.',
    'Management is doing things right; leadership is doing the right things.',
    'Don\'t find fault, find a remedy.',
    'The cautious seldom err.',
    'Do or do not, there is no try.',
    'Talk does not cook rice.',
    'The truth will set you free, but first it will piss you off.',
    'Success is not a resting-place, it is a launching pad.',
    'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    'Always remember that you are absolutely unique. Just like everyone else.',
    'Don\'t let yesterday take up too much of today.',
    'You learn more from failure than success.',
    'Great minds discuss ideas; average minds discuss events; small minds discuss people.'
];

const getRandomQuote = () => {

    let index = Math.floor(Math.random() * Math.floor(22));
    console.log(quotes[index]);  
};

export {
    getRandomQuote
};