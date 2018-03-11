import {combineReducers} from 'redux';
import interest from './interest-reducer';


const allReducers = combineReducers({
    interest: interest
});

export default allReducers;
