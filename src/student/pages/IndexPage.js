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
            forgotForm:'true',
            mainTitle: true,
            samsungPlus:false,
            currentTab: 'sales'
        }
    }

    showSidebar(e){
        e && e.preventDefault();
        this.setState({
            sidebarOpened:true,
            mainTitle: true,
            samsungPlus:false,
            currentTab: 'sales'
        });
    }
    samsungCategories(){
        this.setState({
            sidebarOpened:false,
            mainTitle: false,
            samsungPlus:true
        });
    }
    samsungTag(data){
        this.setState({
            sidebarOpened:true,
            mainTitle: true,
            samsungPlus:false,
            currentTab:data
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
        let redirect = "/account"
        if(this.state.currentTab == 'sales'){
            redirect = "/account"
        }else if(this.state.currentTab == 'technic'){
            redirect = "/samsungLesson"
        }else if(this.state.currentTab == 'audio'){
            redirect = "/samsungLesson"
        }else if(this.state.currentTab == 'mobile'){

        }
        return (

            <div className="page index-page start-page">

                    <aside className={`right-sidebar ${this.state.sidebarOpened ? 'opened' : ''}`} >
                        {
                            forgot == false && (
                                <p></p>

                            )
                        }

                                <AuthForm
                                    root="/auth"
                                    type={this.state.authType}
                                    forgot={this.state.forgotForm}

                                    onRegister={::this.showRegister}
                                    onLogin={::this.showLogin}
                                    onRestoreOn={::this.onRestoreOn}

                                    successRedirect = {redirect}
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


                        <div className={`wr ${this.state.mainTitle ? 'opened' : ''}`}>

                            <h3>digital academy</h3>
                            <p>{this.props.news.title}</p>
                            </div>




                <div className={`samsung-wr ${this.state.samsungPlus ? 'opened' : ''}`}>
                    <div>
                        <h3>Samsung+</h3>
                        <ul>
                            <li onClick={this.samsungTag.bind(this, 'mobile')}>
                                <a href="http://www.samsung-plus.com/" target="_blank">

                                    <span></span>
                                    <p>мобільні<br/>
                                    девайси</p>
                                </a>
                            </li>
                            <li onClick={this.samsungTag.bind(this, 'audio')}>
                                <span></span>
                                <p>аудіо-відео</p>
                            </li>
                            <li onClick={this.samsungTag.bind(this, 'technic')}>
                                <span></span>
                                <p>побутова<br/>
                                    техніка</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <nav className="bottom-nav">
                    <ul>
                        <li>
                            <Link to="/school">
                                Smart School
                            </Link>
                        </li>
                        <li>
                            <a href="#"
                               onClick={::this.samsungCategories}
                            >Samsung + </a>
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
