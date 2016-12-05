import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function TestReducer(state = INITIAL_STATE, action) {

const {type, payload} = action;
    switch (type) {

        case types.REQUEST_TEST:


            return {
                ...state,
                isFetching:true

            };
      


        case types.RECEIVE_TEST:

            const activeTest = payload.length > 0 && payload.filter(t => t.status === 'active')[0];

            let isActiveTest = false;
            let selectedView = 'Profile';
            if (activeTest) {
                isActiveTest = true;
                selectedView = 'Test';
            }
            return {
                ...state,
                data:payload,
                didInvalidate:false,
                isFetching:false,
                isActiveTest,
                selectedView

            };



        default:
            return state;
    }
}
