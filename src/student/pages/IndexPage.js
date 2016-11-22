import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import {Link} from 'react-router'
import AuthForm from '../components/AuthComponents/AuthForm'
import ForgotForm from '../components/AuthComponents/ForgotForm'
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class IndexPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            sidebarOpened:false,
            authType:'login',
            forgotForm:'true'
        }
    }

    showSidebar(e){
        e && e.preventDefault();
        this.setState({
            sidebarOpened:true
        });
    }
    componentDidMount(){
        this.props.actions.getTitle()
    }
    showLogin(){
       this.setState({
            authType:'login'
        });
        console.log('login')
    }
    showRegister(){
        this.setState({
            authType:'register'
        });
        console.log('register')
    }


    onRestoreOn() {
        this.setState({forgotForm:true})
    }
    onRestoreOff() {
        this.setState({forgotForm:false})
    }
    render() {

        const forgot = this.state.forgotForm;
        return (

            <div className="page index-page start-page">

                <aside className={`right-sidebar ${this.state.sidebarOpened ? 'opened' : ''}`} >
                    {
                        forgot == false && (
                            <p>asdasdasd asd asd asd asd </p>

                        )
                    }

                            <AuthForm
                                root=""
                                type={this.state.authType}
                                forgot={this.state.forgotForm}

                                onRegister={::this.showRegister}
                                onLogin={::this.showLogin}
                                onRestoreOn={::this.onRestoreOn}

                                successRedirect="/account"
                            />



                    {
                        forgot == true && (
                            <div className="form-restore">
                                <ForgotForm
                                    root="/auth"
                                    type={this.state.authType}
                                    forgot={this.state.forgotForm}

                                    onRestoreOff={::this.onRestoreOff}
                                />
                            </div>
                        )
                    }
                </aside>
                
                
                    <div className="wr">
                        <h3>digital academy</h3>
                        <p>{this.props.news.title}</p>


                    </div>
                <nav className="bottom-nav">
                    <ul>
                        <li>
                            <Link to="/school">
                                Smart School
                            </Link>
                        </li>
                        <li>
                            <a href="http://www.samsung-plus.com">Samsung + </a>
                        </li>
                        <li>
                            <a href="#" onClick={::this.showSidebar}>Sales </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
};
