import {combineReducers} from 'redux';
import simpleInterest from './simple-interest-reducer';
import compoundInterest from './compound-interest-reducer';


const allReducers = combineReducers({
    simpleInterest: simpleInterest,
    compoundInterest: compoundInterest
});

export default allReducers;
