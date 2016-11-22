import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function ScoreReducerTotal(state = INITIAL_STATE, action) {
const {type, payload} = action;

    switch (type) {


        case types.REQUEST_SCORE_TOTAL:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_SCORE_TOTAL:
            return {
                ...state,
                data:payload,
                isFetching:false,
                didInvalidate:false
            };

        default:
            return state;
    }
}
