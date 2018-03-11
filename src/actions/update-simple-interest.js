import {UPDATED_SIMPLE_INTEREST} from '../reducers/types';

export const updateSimpleInterest = (data) => {
    return {
        type: UPDATED_SIMPLE_INTEREST,
        payload: data
    }
};
