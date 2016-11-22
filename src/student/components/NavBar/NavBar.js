import React, {Component} from 'react';
import {Link} from 'react-router'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        //  this.store = this.props;
    }


    //
    // logout(e) {
    //   e.preventDefault();
    //   this.props.actions.logoutUser();
    // }

    render() {


        return (

                <nav className="top-nav">

                        <Link to='/' onlyActiveOnIndex={true} activeClassName='active'>Головна</Link>

                        <Link to='/auth' activeClassName='active'>Авторизация</Link>
                        <Link to='/updateProfile' activeClassName='active'>Wizard</Link>
                        <Link to='/school' activeClassName='active'>school</Link>
                        <Link to='/lesson' activeClassName='active'>Урок</Link>
                        <Link to='/account' activeClassName='active'>Account</Link>
                        <Link to='/quiz' activeClassName='active'>Тест</Link>


                </nav>

        );
    }
}
