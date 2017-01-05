import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function ProfileReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {

        case types.REQUEST_PROFILE:
            return {
                ...state,
                isFetching:true
            };
        case types.SET_STEP:
            return {
                ...state,
                step:payload
            };
        case types.RECEIVE_PROFILE:
            const data = {
                ...state.data,
                ...payload
            }
            return {
                ...state,
                data,
                isFetching:false,
                didInvalidate:false
            };
        case(types.REQUEST_LOGOUT):
        {

            return {
                ...state,
                ...payload,

                didInvalidate: true,
            }

        }
        case types.SET_ACTIVE_PROFILE:
            return {
                ...state,
                selectedLesson:payload
            };

        default:
            return state;
    }
}
