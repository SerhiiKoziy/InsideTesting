import * as types from '../constants/ActionTypes';
import * as API from '../constants/Api';
import {push} from 'react-router-redux';
import  {initialize as initializeForm, reset as resetForm, destroy as destroyForm} from 'redux-form';
import axios from 'axios';
export function pushRedirect(path) {
    return dispatch => {
        dispatch(push(path))
    }
}


//auth actions
export function login({email, password, lessonId}, redirect = null) {

    return dispatch => {
        dispatch(loginUserRequest());


        axios.post(API.LOGON, {
            email: email,
            password: password,
            lessonID: lessonId
        })
            .then(({data}) => {

                try {

                    if (data.error)  throw new Error(data.error);
                    dispatch(loginUserSuccess(data.user));

                    dispatch(getStudentProfile());

                    if(lessonId){
                        dispatch(joinLesson(lessonId));
                    }

                    if(redirect){
                        dispatch(push(redirect));
                    }
                } catch (e) {
                    dispatch(loginUserFailure(data.error));
                }

            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
export function register(data, redirect = null) {
    return dispatch => {
        dispatch(loginUserRequest());


        axios.post(API.REGISTER, {
            ...data,
            role: "student"
        })
            .then(response => {

                const rdata = response.data;
                try {

                    if (rdata.error)  throw new Error(rdata.error);
                    dispatch(loginUserSuccess(rdata.user));

                    dispatch(getStudentProfile());

                    if(data.lessonId){
                        dispatch(joinLesson(data.lessonId));
                    }
                    if(redirect){
                        dispatch(push(redirect));
                    }
                } catch (e) {
                    dispatch(registerUserFailure(rdata.error));
                }

            })
            .catch(error => {
                dispatch(registerUserFailure(error));
            })
    }
}


export function loginUserRequest() {

    return {
        type: types.LOGIN_USER_REQUEST
    }


}
export function loginUserSuccess(payload) {

    return {
        type: types.LOGIN_USER_SUCCESS,
        payload,
    }


}
export function loginUserFailure(payload) {
    return {
        type: types.LOGIN_USER_FAILURE,
        payload
    }
}
export function registerUserFailure(payload) {
    return {
        type: types.REGISTER_USER_FAILURE,
        payload
    }
}

//dictionary actions

export function getDictionaries() {
    return dispatch => {
        dispatch(requestDictionary());
        axios.get(API.GET_DICTIONARY)
            .then(function ({data}) {
                dispatch(receiveDictionary(data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestDictionary(payload) {
    return {
        type: types.REQUEST_DICTIONARY,
        payload
    };
}
export function receiveDictionary(payload) {
    return {
        type: types.RECEIVE_DICTIONARY,
        payload
    };
}
//profile actions

export function getStudentProfile() {
    return dispatch => {
        dispatch(requestProfile());
        axios.get(API.GET_STUDENT_PROFILE)
            .then(function ({data}) {


                try {

                    if (data.error)  throw new Error(data.error);

                    dispatch(receiveProfile({
                        ...data.profile,
                        //default values
                    }));
                    //dispatch(resetForm());
                    // setTimeout(()=>{
                    //     dispatch(initializeForm('AuthWizard'));

                    // },300);
                } catch (e) {
                    console.log(data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function setStudentProfile(data, redirect) {
    return dispatch => {
        axios.post(API.SET_STUDENT_PROFILE, {
            ...data,
        })
            .then(function ({data}) {
                try {

                    if (data.error)  throw new Error(data.error);
                    console.log(data);

                    dispatch(getStudentProfile());

                    if (!!redirect) {
                        dispatch(pushRedirect(redirect));
                    }


                } catch (e) {
                    console.log(data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function setStudentProfileField() {
    return dispatch => {

        axios.post(API.SET_STUDENT_PROFILE_FIELD, {
            field: 'position',
            value: 'test'
        })
            .then(function ({data}) {


                try {

                    if (data.error)  throw new Error(data.error);

                    dispatch(receiveProfile(data));
                } catch (e) {
                    console.log(data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveProfile(payload) {
    return {
        type: types.RECEIVE_PROFILE,
        payload
    };
}

export function requestProfile() {
    return {
        type: types.REQUEST_PROFILE
    };
}

//test actions
export function requestActiveTest() {
    return {
        type: types.REQUEST_ACTIVE_TEST
    };
}
export function requestTestStatus() {
    return {
        type: types.REQUEST_TEST_STATUS
    };
}

export function getActiveTest(currentQuestionNum = null) {
    return (dispatch, getState) => {
        let lessonId = getState().lessons.selectedLesson;
        //let currentQuestionId = getState().quiz.curID;

        dispatch(requestActiveTest());
        return axios.get(API.GET_ACTIVE_TEST, {
            params: {
                lessonId: lessonId
            }
        })
            .then(function (response) {
                //dispatch(receiveTest(response.quiz));
                dispatch(receiveTest(response.data));


                if (Object.keys(response.data).length > 0) {
                    const {questions, answers, timeLimit, secondsLeft} = response.data;
                    // const {currentQuestionId} = response.quiz;
                    //var currentQuestionId = getState().quiz.curID;
                    var next = getNext({
                        questions,
                        answers,
                        timeLimit,
                        secondsLeft,
                        currentQuestionNum: currentQuestionNum || 0
                    });

                    if(next === 'result'){
                        dispatch(getUserScore());
                    }else {
                        dispatch(receiveNextSlide(next))
                    }

                    dispatch(pushRedirect(`/quiz/${next}`));

                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveNextSlide(payload) {
    return {
        type: types.NEXT_SLIDE,
        payload
    };
}
export function getLessonStatus() {
    return (dispatch, getState) => {
        let lessonId = getState().lessons.selectedLesson;
        if (!lessonId) throw new Error('No lesson selected!');


        dispatch(requestLessonStatus());
        return axios.get(API.GET_LESSON_STATUS, {
            params: {
                lessonId: lessonId
            }
        })
            .then(function (response) {
                if (response.data.error) throw new Error(response.data.error);

                const {isActive, step, activeTestId} = response.data;

                const path = {
                    lesson:`/lesson`,
                    quiz:`/quiz`,
                    updateProfile:`/updateProfile`
                };

                const state = getState().lessons.status;
                const currentPath = getState().routing.locationBeforeTransitions.pathname;

                dispatch(receiveLessonStatus(response.data));





                if(!isActive){
                    dispatch(pushRedirect(`/school`));
                    dispatch(saveSelectedLesson(null));
                    return;
                }
                if (activeTestId !== null) {

                    if (!currentPath.includes(path.quiz)) {

                        dispatch(pushRedirect(path.quiz));
                    }

                    if(activeTestId !== state.activeTestId  ){
                        dispatch(getActiveTest());
                    }
                    return;
                }
                if (step !== 'Lesson') {
                    if (currentPath !== path.updateProfile) {

                        dispatch(pushRedirect(path.updateProfile));
                    }
                    dispatch(setProfileStep(step));
                    return;
                }
                else if (step === 'Lesson') {
                    if (currentPath !== path.lesson) {

                        dispatch(pushRedirect(path.lesson));
                    }
                }

            })
            .catch(function (error) {
                console.error(error);
            });

    }
}
export function setProfileStep(payload) {
    return {
        type: types.SET_STEP,
        payload
    };
}


export function submitAnswer(data) {
    const currentQuestionNum = data.questionId;
    return (dispatch, getState) => {

        axios.post(API.SUBMIT_ANSWER, {

            ...data
        })
            .then(function ({data:responseData}) {
                console.log(data ,responseData);
                //this.setState({profile: data.questionId})
                if (responseData.error) throw new Error(responseData.error);
                dispatch(getActiveTest(currentQuestionNum));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveSubmitTest(payload) {
    return {
        type: types.CURRENT_ANSWER,
        payload
    };
}

export function receiveTest(payload) {
    return {
        type: types.RECEIVE_TEST,
        payload
    };
}
//news actions
export function getNews() {
    return dispatch => {
        dispatch(requestNews());
        axios.get(API.GET_NEWS)
            .then(function (response) {
                dispatch(receiveNews(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

// GET TITLE main page

export function getTitle() {
    return dispatch => {
        dispatch(requestTitle());
        axios.get(API.TITLE)
            .then(function (response) {
                console.log(response.data)
                dispatch(receiveTitle(response.data.title));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestTitle() {
    return {
        type: types.REQUEST_TITLE
    };
}
export function receiveTitle(payload) {
    return {
        type: types.RECEIVE_TITLE,
        payload
    };
}


//NOTES actions
// GET for accaunt

export function getNotes() {
    return dispatch => {
        dispatch(requestNotes());
        axios.get(API.GET_NOTES)
            .then(function (response) {
                console.log(response.data)
                dispatch(receiveNotes(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestNotes() {
    return {
        type: types.REQUEST_NOTES
    };
}
export function receiveNotes(payload) {
    return {
        type: types.RECEIVE_NOTES,
        payload
    };
}

// GET NOTES for lessons
export function getLessonNotes() {
    return (dispatch, getState) => {
        var currentLessonId = getState().lessons.selectedLesson;
        if (!currentLessonId) throw new Error('No lesson selected!');


        dispatch(requestLessonNotes());
        return axios.get(API.GET_LESSON_NOTES, {
            params: {
                lessonId : currentLessonId
            }
        })
            .then(function (response) {
                console.log(response.data)
                dispatch(receiveLessonsNotes(response.data));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestLessonNotes() {
    return {
        type: types.REQUEST_LESSONS_NOTES
    };
}
export function receiveLessonsNotes(payload) {
    return {
        type: types.RECEIVE_LESSONS_NOTES,
        payload
    };
}




// POST NOTES
export function saveNote(data) {

    console.log(data.lessonId, data.valueNote[0]);
    return (dispatch, getState) => {

        axios.post(API.SAVE_NOTE, {
            lessonId: data.lessonId,
            text: data.valueNote[0]
        })
            .then(function ({data:responseData}) {
                console.log("save note", responseData);
                //this.setState({profile: data.questionId})
                if (responseData.error) throw new Error(responseData.error);
                //dispatch(getActiveTest(currentQuestionNum));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
// GET USER for BALACE SHOP
export function getBalance() {
    return dispatch => {
        axios.get(API.USER_BALANCE)
            .then(function (response) {
                console.log("111111", response.data)
                dispatch(receiveBalance(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export function receiveBalance(payload) {
    return {
        type: types.RECEIVE_BALANCE,
        payload
    };
}

// GET PRODUCT for SHOP
export function getPresent() {
    return dispatch => {
        dispatch(requestProducts());
        axios.get(API.PRODUCTS_LIST)
            .then(function (response) {
                //console.log("2222222", response.data)
                dispatch(receiveProducts(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestProducts() {
    return {
        type: types.REQUEST_PRODUCTS
    };
}
export function receiveProducts(payload) {
    return {
        type: types.RECEIVE_PRODUCTS,
        payload
    };
}

// GET BOUGHT PRODUCT for SHOP
export function getBoughtPresent() {
    return dispatch => {
        //dispatch(requestProducts());
        axios.get(API.BOUGHT_PRODUCTS_LIST)
            .then(function (response) {
                //console.log("2222222", response.data)
                dispatch(receiveBoughtProducts(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export function receiveBoughtProducts(payload) {
    return {
        type: types.RECEIVE_BOUGHT_PRODUCTS,
        payload
    };
}

// POST PRODUCT for SHOP
export function sendProductShop(data) {
    console.log( "------", data);
    return (dispatch, getState) => {

        axios.post(API.BUY_PRODUCT, {
            prizeId: data.id,
            count:data.amount
        })
            .then(function ({data:responseData}) {
                console.log( responseData);

                if(responseData.success === true){
                    console.log("success", responseData);
                    dispatch(receiveSendProductShop(responseData.success));
                }
                if(responseData.success === false){
                    console.log("error", responseData);
                    dispatch(receiveSendProductShop(responseData.error));
                }
                //this.setState({profile: data.questionId})
                if (responseData.error) throw new Error(responseData.error);
                //dispatch(getActiveTest(currentQuestionNum));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveSendProductShop(payload) {
    return {
        type: types.RECEIVE_SEND_PROD_SHOP,
        payload
    };
}

// IS APPROVED REGISTRATION
export function getRegistSales() {
    return dispatch => {
        dispatch(requestIsRegist());
        axios.get(API.GET_REGIST_SALES)

            .then(function (response) {
               // console.log('444444444',response.data)
                dispatch(receiveIsRegist(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveIsRegist(payload) {
    return {
        type: types.RECEIVE_IS_APPROVED_REGISTRATION,
        payload
    };
}
export function requestIsRegist() {
    return {
        type: types.REQUEST_IS_APPROVED_REGISTRATION
    };
}

// POST REGISTRATION SALE
export function registrationSale(data) {
    console.log( "sendToApi2:", data);
    return (dispatch, getState) => {
        dispatch(requestRegistSale());
        axios.post(API.POST_REGIST_SALES, data )
            .then(function ({data:responseData}) {
               // console.log(data, responseData);

                if(responseData.success === true){
                    console.log("success", responseData);
                    dispatch(receiveRegistrationSale(true));
                }
                if(responseData.success === false){
                    if(responseData.errors[0] == "invalid_imei"){
                        console.log("error", responseData);
                        dispatch(receiveRegistrationSale('imeiFalse'));
                    }else{
                        console.log("error", responseData);
                        dispatch(receiveRegistrationSale(false));
                    }

                }
                if(responseData.success === false){

                }
                //this.setState({profile: data.questionId})
                if (responseData.error) throw new Error(responseData.error);
                //console.log("error", responseData);
                //dispatch(getActiveTest(currentQuestionNum));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestRegistSale() {
    return {
        type: types.REQUEST_REGIST_SALE
    };
}

export function receiveRegistrationSale(payload) {
    return {
        type: types.RECEIVE_REGIST_SALE,
        payload
    };
}

// POST MAIL FOR NEW PASS
export function sendMail(data) {

    return (dispatch, getState) => {

        axios.post(API.SEND_MAIL, {
            email: data.email
        })
            .then(function ({data:responseData}) {
                console.log( responseData);
                if(responseData.success === true){
                    console.log("you buy prod", responseData);
                    dispatch(receiveSendMail(responseData.success));
                }
                //this.setState({profile: data.questionId})
                if (responseData.error) throw new Error(responseData.error);
                //dispatch(getActiveTest(currentQuestionNum));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveSendMail(payload) {
    return {
        type: types.RECEIVE_SEND_MAIL,
        payload
    };
}


// SEND NEW PASSWORD
export function saveNewPassword(data) {

    return (dispatch, getState) => {


        axios.post(API.RESET_PASSWORD, {
            uid: data.uid,
            password : data.password
        })
            .then(function ({data:responseData}) {

                if(responseData.success === true){
                    console.log("your new pass save", responseData);
                    dispatch(pushRedirect('/'));
                   // dispatch(receiveSavePass(responseData.success));

                }
                //this.setState({profile: data.questionId})
                if (responseData.error) throw new Error(responseData.error);
                //dispatch(getActiveTest(currentQuestionNum));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function receiveSavePass(payload) {
    return {
        type: types.RECEIVE_RESET_PASSWORD,
        payload
    };
}


//score actions
export function getScoreTotal() {
    return dispatch => {
        dispatch(requestScoreTotal());
        axios.get(API.GET_SCORE_TOTAL)
            .then(function (response) {
                console.log("score")
                dispatch(receiveScoreTotal(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}
export function requestScoreTotal() {
    return {
        type: types.REQUEST_SCORE_TOTAL
    };
}
export function receiveScoreTotal(payload) {
    return {
        type: types.RECEIVE_SCORE_TOTAL,
        payload
    };
}

//lessons actions
export function getLessons() {
    return dispatch => {
        dispatch(requestLessons());
        axios.get(API.GET_ACTIVE_LESSONS)
            .then(function (response) {
                dispatch(receiveLessons(response.data.lessons));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export function getUserScore() {
    return (dispatch, getState) => {
        let lessonTestId = getState().lessons.status.activeTestId;
        if(!lessonTestId) throw new Error('No active activeTestId');
        dispatch(requestScore());
        axios.get(API.GET_SCORE, {
            params:{
                lessonTestId
            }
        } )
            .then(function (response) {
                const {data} = response;
                if(response.error) throw new Error(response.error);
                dispatch(receiveScore(data));
            })
            .catch(function (error) {
                alert(error);
            });

    }
}

export function joinLesson(lessonId, onSuccess) {
    return dispatch => {
        dispatch(requestJoinLesson());
        dispatch(saveSelectedLesson(lessonId));
        axios.post(API.JOIN_LESSON, {
            lessonId: lessonId
        }).then(function ({data:{isAuthComplete}}) {
            // dispatch(addLessonsToStore(response.data));

            dispatch(receiveAuthStatus(isAuthComplete));
            console.info(`Join lesson
             isAuthComplete:
             ` + isAuthComplete);

          if(isAuthComplete){
              dispatch(getLessonStatus());
          }else{
              dispatch(pushRedirect('/auth'));
          }


            onSuccess && typeof onSuccess === 'function' && onSuccess();
        })
            .catch(function (error) {
                console.log(error);
            });

    }
}

export function requestJoinLesson() {
    return {
        type: types.REQUEST_JOIN_LESSON
    };
}


export function receiveNews(payload) {
    return {
        type: types.RECEIVE_NEWS,
        payload
    };
}
export function requestNews() {
    return {
        type: types.REQUEST_NEWS
    };
}

export function receiveAuthStatus(payload) {
    return {
        type: types.RECEIVE_AUTH_STATUS,
        payload
    };
}
export function requestLessonStatus() {
    return {
        type: types.REQUEST_LESSON_STATUS
    };
}
export function receiveLessonStatus(payload) {
    return {
        type: types.RECEIVE_LESSON_STATUS,
        payload
    };
}
export function requestLessons() {
    return {
        type: types.REQUEST_LESSONS
    };
}

export function receiveLessons(payload) {
    return {
        type: types.RECEIVE_LESSONS,
        payload
    };
}
export function requestScore() {
    return {
        type: types.REQUEST_SCORE
    };
}
export function receiveScore(payload) {
    return {
        type: types.RECEIVE_SCORE,
        payload
    };
}
export function resetScore(payload) {
    return {
        type: types.RESET_SCORE

    };
}
export function saveSelectedLesson(payload) {
    return {
        type: types.SAVE_SELECTED_LESSON,
        payload
    };
}


//import $ from 'jquery';
export function chooseAnswer(questionId, answers) {
    return (dispatch, getState) => {
        dispatch(addAnswer(questionId, answers));

        const next = getNext(getState().quiz);

        //       dispatch(push(`/quiz/${questionId + 1}`));

    }
}


function getIdByValue(arr, key, value) {
    var filtered = arr.filter(el => el[key] === value);
    return filtered.length !== 0 ? value : undefined
}

function getNext({questions, answers, currentQuestionNum, secondsLeft, timeLimit}) {

        //getState().quiz.curID
   // var currentQuestionId = this.props.quiz.curID;
    if(secondsLeft === 0 && timeLimit !== 0){
        return 'result'
    }

    if ((!!answers && !!questions ) && (answers.length !== questions.length )) {
        let unAnswered;

        //console.log(currentQuestionNum)

        if (answers.length !== 0) {
            unAnswered = questions.filter(q => q.id !== getIdByValue(answers, 'questionId', q.id)).sort((a, b)=> a.num - b.num);
           // let unAnsweredAfter = unAnswered;
        } else {
            unAnswered = [...questions];
        }



        var currentQuestionsObj = questions.filter(q=> q.id == currentQuestionNum)
           // unAnswered.currentQuestionId
        //var currentNum = currentObject.num;
        var sorted = [...unAnswered.filter(q=> q.num > currentQuestionsObj[0].num), ...unAnswered.filter(q=> q.num <= currentQuestionsObj[0].num)];
        console.log('1111', sorted[0].num)

        return sorted[0].num

    } else {
        return 'result'
    }

}


// export function setCookies(sessionUid, chargeAmounts, login) {
//     Cookies.set('sessionUid', sessionUid, {expires: 1});
//     Cookies.set('username', login, {expires: 1});
//     Cookies.set('chargeAmounts', JSON.stringify(chargeAmounts), {expires: 1});
// }
