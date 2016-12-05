import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {routerReducer, routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {combineReducers} from 'redux';
import {AccountReducer, SamsungPlusPlus, QuizReducer, ScoreReducer, LessonsReducer, NotesReducer, UserReducer, DicReducer, NewsReducer, ScoreReducerTotal, ProfileReducer} from '../reducers';
import createLogger from 'redux-logger';
import {INITIAL_STATE} from '../constants/InitialState';
import {reducer as formReducer} from 'redux-form'


const reducer = combineReducers({
    routing: routerReducer,
    account: AccountReducer,
    quiz: QuizReducer,
    form: formReducer,
    lessons: LessonsReducer,
    user: UserReducer,
    userScore: ScoreReducer,
    dic: DicReducer,
    news: NewsReducer,
    scoreTotal: ScoreReducerTotal,
    profile: ProfileReducer,
    notes: NotesReducer,
    samsungPlusPlus: SamsungPlusPlus,

})


export default function configureStore(baseHistory, initialState = INITIAL_STATE) {
    const routingMiddleware = routerMiddleware(baseHistory);
    const logger = createLogger({
        
        // level: {
        //     prevState: false, // disable message of prevState
        //     action: ({ type }) => type && type.indexOf(`redux-form`) > -1 ? false : `info`, // don't show messages from redux-form (sorry, erikras, it's for demo only!)
        //  //   nextState: ({ type }) => type.indexOf(`user`) > -1 ? `warning` : `info`, // show nextState as warning if action is user-related
        //  //   nextState: `log`,
        //
        //     error: `error`
        // }

    });
    const middleware = applyMiddleware(routingMiddleware, thunk, logger);
    const store = createStore(reducer, initialState, compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    const history = syncHistoryWithStore(baseHistory, store)

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
        );
    }

    return {store, history};
}
