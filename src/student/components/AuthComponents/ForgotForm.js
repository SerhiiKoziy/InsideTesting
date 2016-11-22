import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';


import {Field} from 'redux-form';
import RestorePass from '../AuthComponents/RestorePass';


import  {renderTextField, renderDropdownList} from '../AuthComponents/Fields';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class ForgotForm extends Component {

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
    sendClick(result) {
        var mailValue = result.sendEmailLetter;
        this.props.actions.sendMail({
            email: mailValue
        });
    }
    submitRegister(result) {

        this.props.actions.register({
            ...result,
            lessonId: this.props.lessons.selectedLesson || null,

        }, this.props.successRedirect);
    }

    render() {
        const {type:loginType, forgot, dic, root} = this.props;
        console.log("1233232323", dic.sendMailDone)
        const {user} = this.props;
        return (

            <div className="first-step forgot-form">
                {
                    (loginType == 'login' && forgot === true) && (

                        <div className="form-forgot-wr">
                            <div className="close-forgot-form" onClick={this.props.onRestoreOff}>
                                <span></span>
                            </div>

                            {
                                dic.sendMailDone === false ? (
                                    <RestorePass title="ВІДНОВЛЕННЯ ПАРОЛЯ"  description="" onSubmit={::this.sendClick}
                                                 autoComplete="off"
                                                 buttonText="надіслати"
                                                 key="step1">


                                        <Field name="sendEmailLetter" type="text" id="sendEmail" component={renderTextField} placeholder="E-mail"/>
                                        {
                                            !!user.errorLogin && (

                                                <div className="error-holder">
                                                    {user.errorLogin}
                                                </div>
                                            )
                                        }
                                    </RestorePass>
                                ):(
                                    <div className="successMessage">
                                        <p>Посилання для відновлення паролю було<br/>
                                            надіслано на вказану електронну адресу. <br/>
                                            Будь ласка, перевірте електронну пошту.
                                        </p>
                                    </div>

                                )
                            }

                        </div>
                    )

                }
            </div>

        )
    }
}