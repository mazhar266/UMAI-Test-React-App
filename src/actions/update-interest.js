import {UPDATED_INTEREST} from '../reducers/types';

export const updateInterest = (data) => {
    return {
        type: UPDATED_INTEREST,
        payload: {data: data}
    }
};
