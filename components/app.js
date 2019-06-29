import * as TimerComponent from './timer/js/timer.js';
import * as AppBackground from './appBackground/appBackground.js';

//this feels bad, but I can't think of a way yet to setup this one-time running event at startup
TimerComponent.setTotalSeconds();
AppBackground.getBackgroundImage();