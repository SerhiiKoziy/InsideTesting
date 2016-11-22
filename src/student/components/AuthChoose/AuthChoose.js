import React, {PropTypes} from 'react';
import Button from '../Button/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

const AuthChoose = ({actions}) => (
    <div className="page start-page step2">
        <div className="btn-wr center">
            <Button onClick={()=> actions.pushRedirect('/auth/login')}>
                У мене є аккаунт Smart School
            </Button>
            <Button onClick={()=> actions.pushRedirect('/auth/register')}>
                Створити аккаунт Smart School
            </Button>

        </div>
    </div>

);

// Make ESLint happy again: add validation to props
AuthChoose.propTypes = {};
AuthChoose.defaultProps = {};

export default connect(state => state, mapDispatchToProps)(AuthChoose);
