import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function LessonsReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {

        case types.RECEIVE_AUTH_STATUS:
            return {
                ...state,
                isAuthComplete:payload
            };
        case types.REQUEST_LESSONS:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_LESSONS:
            return {
                ...state,
                data:payload,
                isFetching:false,
                didInvalidate:false
            };

        case types.REQUEST_JOIN_LESSON:
            return{
                ...state
            };

        case types.RECEIVE_LESSON_STATUS:
            return{
                ...state,
                status:payload
            };

        case types.SAVE_SELECTED_LESSON:
            return {
                ...state,
                selectedLesson:payload
            };






        default:
            return state;
    }
}
