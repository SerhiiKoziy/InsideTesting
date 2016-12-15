export const INITIAL_STATE = {
    quiz: {
        data:{

        },
        nextSlide:1,
        isFetching: false,
        didInvalidate: true, //alert,

    },
    samsungPlusPlus:{
      dataTest:{}
    },
    //curID: {},
    account:{

    },
    user: {
        id: null,
        name: null,
        role: null,
        errorLogin: '',
        errorDescription: '',
        isAuthenticating: false
    },
    lessons: {
        selectedLesson: null,
        data: [],
        progress:'',
        isFetching: false,
        didInvalidate: true,    
        status:{
            activeTestId:null
        },
        isAuthComplete:false
    },
    dic: {
        data: {},
        isFetching: false,
        didInvalidate: true,
        sendMailDone:false,
    },
    news: {
        data: [],
        isFetching: false,
        didInvalidate: true
    },
    notes: {
        data: [],
        isFetching: false,
        didInvalidate: true
    },
    scoreTotal: {

    },
    profile: {
        id: 0,
        data: {
            streetType: 'вул.'
        },
        isFetching: false,
        didInvalidate: true,
        step:'Name'

    },
    userScore: {

        data: {
            score:null,
            totalCorrect:null
        },
        isFetching: false,
        didInvalidate: true,
    }
};
