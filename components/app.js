import * as TimerComponent from './timer/js/timer.js';
import * as TimerUI from './timer/js/timer-ui.js';
import * as AppBackground from './appBackground/js/appBackground.js';
import * as AppQuote from './appQuotes/js/quotes.js';

//this feels bad, but I can't think of a way yet to setup this one-time running event at startup
TimerUI.renderTimer();
AppBackground.getBackgroundImage();
AppQuote.showQuote();