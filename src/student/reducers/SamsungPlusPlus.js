import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function SamsungPlusPlus(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {

        /*case types.RECEIVE_LESSONS_PLUS_PLUS:
            return {
                ...state,
                lessonsPlusPlus:payload,
                isLoadesLessons:true
            };

        case types.REQUEST_LESSONS_PLUS_PLUS:
            return {
                ...state,
                isLoadesLessons:false
            };*/
        case types.RECEIVE_SAMSUNG_LESSONS:
            return {
                ...state,
                selectLesson:payload.selectLesson,
                presentationUrl:payload.presentationUrl,
                nameLesson:payload.nameLesson,

            };

        case types.RECEIVE_TEST_PLUS_PLUS:
            return {
                ...state,
                dataTest:payload,
                didInvalidate:false,
                isFetching:false

            };
        case types.REQUEST_ACTIVE_TEST_PLUS_PLUS:
            return {
                ...state,
                dataTest:payload,


            };

        case types.RECEIVE_AUTH_STATUS_PLUS_PLUS:
            return {
                ...state,
                isAuthComplete:payload,


            };


        case types.RECEIVE_LESSON_STATUS_PLUS_PLUS:
            return{
                ...state,
                status:payload
            };
        case types.SAVE_SELECTED_LESSON_PLUS_PLUS:
            return{
                ...state,
                selectedLesson:payload
            };


        case types.REQUEST_LESSON_STATUS_PLUS_PLUS:
            return{
                ...state,
                requestStatus:payload
            };
        case types.START_TEST:
            return{
                ...state,
                startTest:true
            };

        default:
            return state

    }
}
