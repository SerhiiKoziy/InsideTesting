import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {DashboardReducer,TestReducer} from '../reducers';
import createLogger from 'redux-logger';
import {INITIAL_STATE} from '../constants/InitialState';

const reducer = combineReducers({
    dashboard: DashboardReducer,
    test: TestReducer
});


export default function configureStore(baseHistory, initialState = INITIAL_STATE) {
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
    const middleware = applyMiddleware( thunk, logger);
    const store = createStore(reducer, initialState, compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
        );
    }

    return {store};
}
