import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function DicReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {

        case types.RECEIVE_SEND_MAIL:
            return {
                ...state,
                sendMailDone:payload
            };
        case types.RECEIVE_RESET_PASSWORD:
            return {
                ...state,
                sendPass:payload
            };


        case types.REQUEST_DICTIONARY:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_DICTIONARY:
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
