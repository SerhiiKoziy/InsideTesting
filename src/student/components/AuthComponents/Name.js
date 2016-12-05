import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

import WizardStep from './WizardStep';
import Submit from '../Submit/Submit';
import renderTextField from './Fields';

const Name = (props) => {
    const { onSubmit, pristine, reset, submitting, buttonText,valid, ...wizardProps} = props;
    return (
        <WizardStep {...wizardProps} onSubmit={onSubmit}>
            <Field name="email" type="text" component={renderTextField} placeholder="E-mail" />
            <Field name="password" type="password" component={renderTextField} placeholder="Пароль"/>
            <Submit type="fw" disabled={ pristine || !valid} >
                {buttonText}
            </Submit>


            </WizardStep>


    )
}
Name.defaultProps = {
    buttonText:'Продовжити',
};

export default reduxForm({
    form: 'AuthWizard',              // <------ same form name
    destroyOnUnmount: false,     // <------ preserve form data
    validate
})(Name)