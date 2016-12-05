import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function ScoreReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {

        case types.RESET_SCORE:
            return {
                ...state,
                data:{},
                isFetching:false,
                didInvalidate:true
            };
        case types.REQUEST_SCORE:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_SCORE:
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
