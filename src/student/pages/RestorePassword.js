import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';



import {Field} from 'redux-form';
import ChangePass from '../components/AuthComponents/ChangePass';
import  {renderTextField, renderDropdownList} from '../components/AuthComponents/Fields';


class RestorePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    submitRestorePassword(result) {
        //  console.log(result);
        this.props.actions.saveNewPassword({
            uid: this.props.params.uid,
            ...result


        })
    }
    render() {

        return(
            <div className="page restore-password">

                <div className="form-wr">
                    <ChangePass title="Введіть Ваш новий пароль" description="" onSubmit={::this.submitRestorePassword}
                           autoComplete="off"
                           buttonText="Змінити пароль"
                           key="step1">

                        <Field name="password" type="text" component={renderTextField} placeholder="Введіть пароль"/>

                        <Field name="repeatPassword" type="password" component={renderTextField}
                               placeholder="Повторіть пароль"/>


                        {/*
                            !!user.errorLogin && (

                                <div className="error-holder">
                                    {user.errorLogin}
                                </div>
                            )*/
                        }


                    </ChangePass>
                </div>

            </div>

        )
    }
}


function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(RestorePassword);