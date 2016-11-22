import React, {PropTypes, Component, cloneElement} from 'react';
import {Field, reduxForm} from 'redux-form';
import {validate} from './validate';
import Submit from '../Submit/Submit';
import cuid from 'cuid';

import {connect} from 'react-redux';

const WizardStepInner = (props) => {
    const {pristine, customFormName, reset, submitting, buttonText, valid, title, description, handleSubmit, children, validFromProps} = props;
    //const submitText = this.props.submitAnimation
    return (
        <form onSubmit={handleSubmit}>
            <h4>{title}</h4>
            {description.length > 0 && (

                <p>{description}</p>

            )}
            {children}
            <Submit type="fw" disabled={ validFromProps  || !valid}>
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
    buttonText: 'Зберегти',
    validFromProps:false
};

const WizardStep = (Component) => (
 function ({customFormName, ...props}) {
    // передаем переменную с данными пользователя как свойство
    // вместе с остальными переданными свойствами

    return  reduxForm({
         form: customFormName,              // <------ same form name
         destroyOnUnmount: false,     // <--- --- preserve form data
         validate
     })(Component)
}
)



const decoratedReduxForm =  reduxForm({
    form: 'AuthWizard',              // <------ same form name
    destroyOnUnmount: false,     // <--- --- preserve form data
    validate,
  //enableReinitialize:true,
  //  keepDirtyOnReinitialize:true
})(WizardStepInner);


export  default connect(
    state => ({
        initialValues: state.profile.data // pull initial values from account reducer
    })          // bind account loading action creator
)(decoratedReduxForm)
