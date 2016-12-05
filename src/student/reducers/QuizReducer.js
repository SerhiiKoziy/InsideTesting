import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function QuizReducer(state = INITIAL_STATE, action) {

const {type, payload} = action;
    switch (type) {


        case types.CURRENT_ANSWER:
            return {
                ...state,
                //curID:payload,
                didInvalidate:false,
                isFetching:false
            };

        case types.NEXT_SLIDE:
            return {
                ...state,
                nextSlide:payload,
            };

        case types.RECEIVE_TEST:


            return {
                ...state,
                data:payload,
                didInvalidate:false,
                isFetching:false

            };



        default:
            return state;
    }
}
