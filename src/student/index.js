import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import {Provider} from 'react-redux';
import { Router } from 'react-router';

import routes from './routes';
import configureStore from './store/configureStore';

const { store, history } = configureStore(hashHistory);
//import App from './App';

const titles = {
    '/': 'DIGITAL ACADEMY',
    '/school': 'school',
    '/auth': 'student',
    /*'/updateProfile': 'updateProfile',
    '/auth/login': 'login',
    'student/lesson': 'lesson',
    'student/quiz': 'quiz',*/


};

function setTitle(title){

   // (title === 'DIGITAL ACADEMY') || (title === 'school') ? document.title = title : document.title = 'student';
    let titles2 = 'DIGITAL ACADEMY';
document.title = titles2
}
function getTitle(route){
    console.log('Current route шт getTitle is : ', route, titles);
    return titles[route];
    //тут регекса чуток
}

hashHistory.listen(function (ev) {
    setTitle(getTitle(ev.pathname));
    let currentRout = ev.pathname;
    console.log('Current route is: ', ev.pathname);
});
render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
    , document.getElementById('app'));
