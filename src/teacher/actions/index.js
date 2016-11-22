import * as types from '../constants/ActionTypes';
import * as API from '../constants/Api';
import axios from 'axios';
const lessonId = window.LESSON_ID;
export function getLessonTests() {
    return (dispatch,getState) => {
        dispatch(requestTest());
        axios.get(API.GET_TEST,{

            params: {
                lessonId:window.LESSON_ID
            }
            
        })
            .then(function ({data}) {
                dispatch(receiveTest(data));

                const activeTest = data.filter(t => t.status === 'active')[0];
                if(getState().dashboard.selectedTest === null){
                    if(activeTest){
                        dispatch(selectTest(activeTest.id));
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function getLessonDashboard() {
    return (dispatch, getState) => {
        dispatch(requestDashboard());
        axios.get(API.GET_DASHBOARD,{

            params: {
                lessonId:window.LESSON_ID
            }
        })
            .then(function ({data}) {
                dispatch(receiveDashboard(data));

                

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export function requestDashboard(payload) {
    return {
        type: types.REQUEST_DASHBOARD
    };
}
export function receiveDashboard(payload) {
    return {
        type: types.RECEIVE_DASHBOARD,
        payload
    };
}
export function requestTest() {
    return {
        type: types.REQUEST_TEST
    };
}
export function receiveTest(payload) {
    return {
        type: types.RECEIVE_TEST,
        payload
    };
}
export function selectTest(payload) {
    return {
        type: types.SELECT_TEST,
        payload
    };
}

export function requestLessonStep(payload) {
    return {
        type: types.POST_REQUEST_LESSON_STEP,
        payload
    };
}


//ctrl
export function setLessonStep(payload) {
    return dispatch => {
        dispatch(requestLessonStep(payload));
        axios.post(API.SET_LESSON_STEP, {
            lessonId:window.LESSON_ID,
            step:payload

        }).then(response => {
            console.log(response.data)
        });
    }
}
export function postStartTest(payload) {
    return dispatch => {
        axios.post(API.POST_START_TEST, {
            lessonId:window.LESSON_ID,
            testId:payload

        }).then(response => {
            dispatch(getLessonTests());
            dispatch(getLessonDashboard());
        });
    }
}
export function postEndTest(payload) {
    return dispatch => {
        axios.post(API.POST_END_TEST, {
            lessonId:window.LESSON_ID,
            testId:payload

        }).then(response => {
            dispatch(getLessonTests());
            dispatch(getLessonDashboard());
        });
    }
}