import React, {PropTypes, Component} from 'react';
import {Field, reduxForm} from 'redux-form';

import {connect} from 'react-redux';
import {validate,asyncValidate} from './validate';
import Submit from '../Submit/Submit';
import cuid from 'cuid';


const WizardStepInner = (props) => {
    const {pristine, customFormName, reset, submitting, buttonText, valid, title, description, handleSubmit, children} = props;

    return (
        <form onSubmit={handleSubmit}>
            <h4>{title}</h4>
            {description.length > 0 && (

                <p>{description}</p>

            )}
            {children}
            <Submit type="fw" disabled={ pristine || !valid}>
                {buttonText}
            </Submit>
        </form>
    )
};
// Make ESLint happy again: add validation to props
WizardStepInner.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

WizardStepInner.defaultProps = {
    title: 'title',
    description: 'Lorem ipsum dolor sit amet adipiscing',
    buttonText: 'Продовжити'
};


const decoratedReduxForm = reduxForm({
    form: 'RegisterForm',              // <------ same form name
    destroyOnUnmount: false,     // <--- --- preserve form data
    validate,
    asyncValidate,
})(WizardStepInner)

export  default connect(
    state => ({
        initialValues: state.profile.data // pull initial values from account reducer
    })          // bind account loading action creator
)(decoratedReduxForm)