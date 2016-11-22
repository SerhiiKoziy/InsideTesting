import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function NotesReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {

        
        
        case types.REQUEST_NOTES:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_NOTES:
            return {
                ...state,
                data:payload,
                isFetching:false,
                didInvalidate:false
            };


        case types.REQUEST_LESSONS_NOTES:
            return {
                ...state,
                isFetching:true
            };
        case types.RECEIVE_LESSONS_NOTES:
            return {
                ...state,
                notes:payload,
            };


        default:
            return state;
    }
}
