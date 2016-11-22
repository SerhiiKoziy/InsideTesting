import React, {PropTypes} from 'react';


const TextField = ({id,className, answerType, valueField, answer, valueCurrent, fieldType,placeholder,errorText, errorVisible, onChange, label, ...otherProps}) => {
    placeholder = placeholder || label;
    return (
    <div className={`input-box ${errorVisible ? 'error' : ''} ${className}`}>
        {fieldType === 'input' ? (
        <input placeholder={placeholder}
               id={id}
               value={valueCurrent}
               {...otherProps}
               onChange={typeof onChange == 'function' ? onChange : false}/>
        ) : (
            fieldType === 'textarea' ? (
                <textarea placeholder={placeholder} id={id} {...otherProps}  onChange={typeof onChange == 'function' ? onChange : false}/>
            ) : ('')
        )
        }


        <label className="input-error" htmlFor={id}>{errorText}</label>
    </div>
    )
};

// Make ESLint happy again: add validation to props
TextField.propTypes = {
    id:PropTypes.string,
    placeholder:PropTypes.string,
    errorVisible:PropTypes.bool,
    errorText:PropTypes.string,
    onChange:PropTypes.func,
    value:PropTypes.string
};
TextField.defaultProps = {
    //value:'',
    errorText:'error',
    fieldType:'input',
    placeholder:'',
    errorVisible:false,
    className:''

};

export default TextField;
