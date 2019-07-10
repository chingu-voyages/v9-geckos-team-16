import * as TimerUI from './timer/js/timer-ui.js';
import * as AppBackground from './appBackground/js/appBackground.js';
import * as AppQuote from './appQuotes/js/quotes.js';
import * as AppGreeting from './greeting/js/greeting.js';

TimerUI.renderTimer();
AppBackground.getBackgroundImage();
AppQuote.showQuote();
AppGreeting.renderGreeting();