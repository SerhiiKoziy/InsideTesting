import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function UserReducer(state = INITIAL_STATE, action) {
    const {type, payload} = action;
    switch (type) {


        case(types.LOGIN_USER_SUCCESS):
        {

            return {
                ...state,
                ...payload,
                errorLogin:'',
                errorDescription:'',
                isAuthenticating: false,
            }
            
        }
        case(types.LOGIN_USER_LOGOUT):
        {

            return {
                ...state
            }

        }

        case(types.LOGIN_USER_FAILURE):
        {

            return {
                ...state,
                errorLogin:payload,
                isAuthenticating: false
            }
            
        }
        case(types.REGISTER_USER_FAILURE):
        {

            return {
                ...state,
                errorRegister:payload,
                isAuthenticating: false
            }
            
        }
        case types.LOGIN_USER_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            }
        default:
            return state
    }
}
