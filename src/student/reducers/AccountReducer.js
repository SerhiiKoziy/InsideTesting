import * as types from '../constants/ActionTypes';
import {INITIAL_STATE} from '../constants/InitialState';

export default function AccountReducer(state = INITIAL_STATE, action) {
const {type, payload} = action;
    switch (type) {



        case types.RECEIVE_PRODUCTS:
            return {
                ...state,
                presents:payload,
                isLoadProduct:false
            };

        case types.REQUEST_PRODUCTS:
            return {
                ...state,
                isLoadProduct:true
            };


        case types.RECEIVE_BALANCE:
            return {
                ...state,
                personBalance:payload
            };

        case types.RECEIVE_SEND_PROD_SHOP:
            return {
                ...state,
                resultBuying:payload
            };
        case types.RECEIVE_REGIST_SALE:
            return {
                ...state,
                isSendedSale:true,
                sendRegistrationSale:payload
            };

        case types.REQUEST_REGIST_SALE:
            return {
                isSendedSale:false
            };


        case types.RECEIVE_BOUGHT_PRODUCTS:
            return {
                ...state,
                boughtPresent: payload
            };


        case types.RECEIVE_IS_APPROVED_REGISTRATION:
            return {
                ...state,
                isRegist:payload,
                isFetching:false
            };
        case types.REQUEST_IS_APPROVED_REGISTRATION:
            return {
                ...state,
                isSendedSale:true,
                sendRegistrationSale: false,
                isFetching:true
            };




        default:
            return state

    }
}
