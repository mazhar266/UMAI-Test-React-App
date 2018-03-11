import {UPDATED_INTEREST} from './types';

export default (state = false, action) => {
    switch (action.type) {
        case UPDATED_INTEREST:
            return action.payload;
        default:
            return state;
    }
}
