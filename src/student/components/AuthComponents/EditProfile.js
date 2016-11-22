import React, {PropTypes, Component} from 'react';
import {Field, reduxForm} from 'redux-form';

import {connect} from 'react-redux';
import {validate,asyncValidate} from './validate';
import Submit from '../Submit/Submit';
import cuid from 'cuid';


const WizardStepInner = (props) => {
    const {pristine, customFormName, reset, submitting, buttonText, valid,  title, description, handleSubmit, children} = props;

    return (
        <form onSubmit={handleSubmit}>
           
            {children}
            <Submit type="fw" disabled={ !valid}>
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
    buttonText: 'Завершити редагування'
};




const decoratedReduxForm =  reduxForm({
    form: 'EditProfile',              // <------ same form name
    validate,
    enableReinitialize:true
})(WizardStepInner);


export  default connect(
    state => ({
        initialValues: state.profile.data // pull initial values from account reducer
    })          // bind account loading action creator
)(decoratedReduxForm)
