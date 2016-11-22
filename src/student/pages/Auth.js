import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import cuid from 'cuid';
import  {renderTextField, renderDropdownList} from '../components/AuthComponents/Fields';
import AuthForm from '../components/AuthComponents/AuthForm';
import ForgotForm from '../components/AuthComponents/ForgotForm'
import {Link} from 'react-router'

class Auth extends Component {
    static propTypes = {};
    static defaultProps = {};
    constructor(props) {
        super(props);

        this.state = {

            forgotForm:false,
        }


    };
    onRestoreOn() {
        this.setState({forgotForm:true})
    }
    onRestoreOff() {
        this.setState({forgotForm:false})
    }
    onRegister() {
        this.props.actions.pushRedirect(`/auth/register`)
    }

    onLogin() {
        this.props.actions.pushRedirect(`/auth/login`)
    }

    render() {
        const forgot = this.props;

        return (


            <div className="page registration-wr">



                        <div className="form-wr">
                            <AuthForm
                                root="/auth"
                                type={this.props.params.type}
                                forgot={this.state.forgotForm}


                                onRegister={::this.onRegister}
                                onLogin={::this.onLogin}
                                onRestoreOn={::this.onRestoreOn}

                            />
                        </div>




                        <div className="form-restore">
                            <ForgotForm
                                root="/auth"
                                type={this.props.params.type}
                                forgot={this.state.forgotForm}

                                onRestoreOff={::this.onRestoreOff}
                            />
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
export default connect(state => state, mapDispatch)(Auth);