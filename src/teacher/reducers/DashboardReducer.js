import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function DashboardReducer(state = INITIAL_STATE, action) {

    const {type, payload} = action;
    switch (type) {

        case types.REQUEST_DASHBOARD:
            return {
                ...state,
                isFetching: true
            }
        case types.POST_REQUEST_LESSON_STEP:
            return {
                ...state
            }
        case types.RECEIVE_DASHBOARD:

         

            return {
                ...state,
                data: payload,
                didInvalidate: false,
                isFetching: false

            };

        case types.SELECT_TEST:


            return {
                ...state,
                selectedTest: payload

            };

        default:
            return state;
    }
}
