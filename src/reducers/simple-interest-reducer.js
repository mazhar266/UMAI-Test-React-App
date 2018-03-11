import {UPDATED_SIMPLE_INTEREST} from './types';

export default (state = {
  principal: 0,
  rate: 0,
  time: 0,
  interest: 0
}, action) => {
    switch (action.type) {
        case UPDATED_SIMPLE_INTEREST:
            return action.payload;
        default:
            return state;
    }
}
