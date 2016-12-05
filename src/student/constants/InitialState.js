export const INITIAL_STATE = {
    quiz: {
        data:{

        },
        nextSlide:1,
        // data: {
        //     "id": 2,
        //     "title": "test test",
        //     "timeLimit": 300,
        //     "score": 100,
        //     "questions": [{
        //          "id": 1, "text": "текстовый вопрос", "type": "text", "selectList": null
        //      }, {
        //         "id": 2,
        //         "text": "сингл селект вопрос",
        //         "type": "select",
        //         "selectList": [{"value": "ответ1", "text": "овтет1"}, {"value": "ответ2", "text": "ответ2"}]
        //     }, {
        //         "id": 3,
        //         "text": "мульти селект вопрос",
        //         "type": "multiselect",
        //         "selectList": [{"value": "ответ11", "text": "овтет11"}, {"value": "ответ22", "text": "ответ22"}]
        //     }, {
        //          "id": 4,
        //          "text": "да/нет вопрос",
        //          "type": "bit",
        //          "selectList": null
        //      },{
        //         "id": 5,
        //         "text": "вопрос от 1 до 10",
        //         "type": "opinion",
        //         "selectList": null
        //     }],
        //     "answers": []
        // },
        isFetching: false,
        didInvalidate: true, //alert,



    },
    samsungPlusPlus:{
      dataTest:{}
    },
    //curID: {},

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

    /*totalScore: {
        data: {
            score:null,
            totalCorrect:null
        },
        isFetching: false,
        didInvalidate: true
    },*/
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
