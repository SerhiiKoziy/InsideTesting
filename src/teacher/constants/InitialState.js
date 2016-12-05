export const INITIAL_STATE = {
    test: {
        data: [],
        isFetching: false,
        didInvalidate: true,

    },
    dashboard:{
        data: [],
        isFetching: false,
        didInvalidate: true,
        selectedTest:null,
        selectedView:'Profile',
        isActiveTest:false
    }
};
