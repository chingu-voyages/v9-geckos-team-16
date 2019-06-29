import * as TimerComponent from './timer/js/timer.js';
import * as AppBackground from './appBackground/js/appBackground.js';
import * as AppQuote from './appQuotes/js/quotes.js';

//this feels bad, but I can't think of a way yet to setup this one-time running event at startup
TimerComponent.setTotalSeconds();
AppBackground.getBackgroundImage();
AppQuote.getRandomQuote();