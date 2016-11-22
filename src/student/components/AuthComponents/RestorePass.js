import React, {PropTypes, Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {validate} from './validate';
import Submit from '../Submit/Submit';
import  {renderTextField} from '../AuthComponents/Fields';
import cuid from 'cuid';


const WizardStepInnerForgot = (props) => {

    const {pristine, customFormName, reset, submitting, buttonText, valid, title, description, handleSubmit, children} = props;



    /*this.props.actions.sendMail({
        email: document.getElementById("sendEmail")
    });*/

    return (

            <form onSubmit={handleSubmit} >
                <h4>{title}</h4>
                {description.length > 0 && (
                    <p>{description}</p>
                )}


                {children}



                <Submit type="fg" disabled={ pristine || !valid}>
                    {buttonText}
                </Submit>
            </form>



    )
};
// Make ESLint happy again: add validation to props
WizardStepInnerForgot.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

WizardStepInnerForgot.defaultProps = {
    title: 'ВІДНОВЛЕННЯ ПАРОЛЯ',
    description: 'Lorem ipsum dolor sit amet adipiscing',
    buttonText: 'надіслати'
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
;




export default reduxForm({
    form: 'ForgotForm',              // <------ same form name
    destroyOnUnmount: false,     // <--- --- preserve form data
    validate,
})(WizardStepInnerForgot)
