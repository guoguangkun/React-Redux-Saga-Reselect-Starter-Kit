import {combineReducers} from 'redux';
import app from './app';
import home from './home';
import counter from './counter';

const ss = combineReducers({
    app,
    home,
    counter,
});

export default ss;
