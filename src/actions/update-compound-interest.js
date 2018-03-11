import {UPDATED_COMPOUND_INTEREST} from '../reducers/types';

export const updateCompoundInterest = (data) => {
    return {
        type: UPDATED_COMPOUND_INTEREST,
        payload: data
    }
};
