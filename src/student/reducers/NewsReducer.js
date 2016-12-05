import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function NewsReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;

    switch (type) {

        case types.REQUEST_TITLE:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_TITLE:
            return {
                ...state,
                title:payload,
                isFetching:false,
                didInvalidate:false
            };

        case types.REQUEST_NEWS:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_NEWS:
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
