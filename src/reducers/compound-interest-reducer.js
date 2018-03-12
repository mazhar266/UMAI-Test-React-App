import {UPDATED_COMPOUND_INTEREST} from './types';

export default (state = {
  principal: 0,
  rate: 0,
  compound: 1,
  time: 0,
  error: false,
  interest: []
}, action) => {
    switch (action.type) {
        case UPDATED_COMPOUND_INTEREST:
            return action.payload;
        default:
            return state;
    }
}
