import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';


import {Field} from 'redux-form';
import Login from '../AuthComponents/Login';
import Register from '../AuthComponents/Register';
import Button from '../Button/Button';
import  {renderTextField, renderDropdownList} from '../AuthComponents/Fields';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthForm extends Component {
    static propTypes = {

        onRegister:PropTypes.func,
        onLogin:PropTypes.func,
        successRedirect:PropTypes.string

    };
    static defaultProps = {
        onRegister: ()=> {
        },
        onLogin: ()=> {
        },
        successRedirect:null
    };

    constructor(props) {
        super(props);
    }

    submitLogin(result) {
        //  console.log(result);
        this.props.actions.login({
            ...result,
            lessonId: this.props.lessons.selectedLesson || null,


        },this.props.successRedirect);


    }


    submitRegister(result) {

        this.props.actions.register({
            ...result,
            lessonId: this.props.lessons.selectedLesson || null,

        }, this.props.successRedirect);
    }

    render() {
        const {type:loginType, forgot, root} = this.props;
        const {user} = this.props;
        return (

            <div className={`first-step ${forgot === true ? "blur-form": "" }`} >
                {
                    loginType == 'login' ? (

                            <Login title="вхід" description="Форма входу" onSubmit={::this.submitLogin}
                                   autoComplete="off"
                                   buttonText="Вхід"
                                   key="step1">

                                <Field name="email" type="text" component={renderTextField} placeholder="E-mail"/>



                                <Field name="password" type="password" component={renderTextField}
                                       placeholder="Пароль"/>

                                <p className="forgot-pass" onClick={this.props.onRestoreOn}>Забули пароль?</p>

                                {
                                    !!user.errorLogin && (

                                        <div className="error-holder">
                                            {user.errorLogin}
                                        </div>
                                    )
                                }


                            </Login>





                    ) :
                        (




                            <Register title="Реєстрація" description="Форма реєстраціі"
                                      buttonText="Зареєструватися"
                                      customFormName="registerForm"
                                      onSubmit={::this.submitRegister} key="step2">
                                <Field name="name" type="text" component={renderTextField} placeholder="Имя"/>

                                <Field name="email" type="text" component={renderTextField}
                                       placeholder="E-mail"/>
                                <Field name="password" type="password" component={renderTextField}
                                       placeholder="Пароль"/>
                                <Field name="repeatPassword" type="password" component={renderTextField}
                                       placeholder="Підтвердити пароль"/>

                                {
                                    !!user.errorRegister && (

                                        <div className="error-holder">
                                            {user.errorRegister}
                                        </div>
                                    )
                                }


                            </Register>
                        )

                }

                <div className="btn-wr col switcher">
                    {
                        loginType == 'login' ? (

                            <Button className="btn btn--fw btn--white"
                                    onClick={this.props.onRegister}>
                                Зареєструватися
                            </Button>
                        ) : (
                            <Button className="btn btn--fw btn--white"
                                    onClick={this.props.onLogin}>
                                Вхід
                            </Button>
                        )
                    }


                </div>


            </div>

        )
    }
}