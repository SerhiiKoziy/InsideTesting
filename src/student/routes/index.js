import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {routerActions} from 'react-router-redux';
import {Root, Auth, Lesson, BuyPresent, RegistrationSale, Quiz, Account, SelectLesson, IndexPage, updateProfile, RestorePassword} from '../pages';
import AuthChoose from '../components/AuthChoose/AuthChoose'
import NavBar from '../components/NavBar/NavBar';
//import {App} from '../pages'
import {UserAuthWrapper} from 'redux-auth-wrapper'

// //Redirects to /login by default
// const UserIsAuthenticated = UserAuthWrapper({
//     authSelector: state => state.user, // how to get the user state
//     failureRedirectPath: '/login',
//     predicate: user=>user.sessionUid,
//     redirectAction: routerActions.replace, // the redux action to dispatch for redirect
//     wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
// })
// UserIsAuthenticated.onEnter = (store, nextState, replace) => {
//     const user = store.getState().user;
//
//     if (!user.sessionUid) {
//         replace({
//             pathname: '/login',
//             state: {redirect: nextState.location.pathname},
//         });
//     }
// };

const lessonSelectedAndFetched = UserAuthWrapper({
    authSelector: state => state.lessons, // how to get the user state
    failureRedirectPath: '/school',
    predicate: lessons=>(!!lessons.selectedLesson && lessons.data.length !== 0),
    redirectAction: routerActions.replace, // the redux action to dispatch for redirect
    wrapperDisplayName: 'lessonSelectedAndFetched' // a nice name for this auth check
});

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.profile, // how to get the user state
    failureRedirectPath: '/school',
    predicate: profile=> !profile.didInvalidate,
    redirectAction: routerActions.replace, // the redux action to dispatch for redirect
    wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

export default(

    <Route name="Root" path='/' component={Root}>
        <Route name="auth" path='auth'>
            <Route path=":type" component={lessonSelectedAndFetched(Auth)}></Route>
            <IndexRoute name="chooseMethod" component={lessonSelectedAndFetched(AuthChoose)}/>

        </Route>


        <Route name="updateProfile" path='updateProfile' component={lessonSelectedAndFetched(updateProfile)}/>
        // TODO : fix this!!! with lessonSelectedAndFetched
        <Route name="lesson" path='lesson' component={lessonSelectedAndFetched(Lesson)}/>
        <Route name="school" path='school' component={SelectLesson}/>
        <Route name="quiz" path='quiz' >
            {/*temp mock redirect */}
            <Route name="question" path=":id" component={lessonSelectedAndFetched(Quiz)} />
            <IndexRedirect to="1"/>
        </Route>
        <Route name="account" path='account' component={Account}>
        </Route>
        <Route name="present" path='present' component={BuyPresent}/>
        <Route name="registrationSale" path='registrationSale' component={RegistrationSale}/>
        <Route name="restore" /*path="restore"*/ path="restore/:uid" component={RestorePassword} />

        <IndexRoute name="index"  component={IndexPage}>

        </IndexRoute>
    </Route>
);
// <Route name="history" path='history' component={UserIsAuthenticated(History)}/>
// <Route name="auth" path="login" component={Auth}/>
//     <IndexRoute name="dashboard" component={UserIsAuthenticated(Dashboard)}/>

//
