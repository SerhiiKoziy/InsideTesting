import React, {PropTypes} from 'react';


const DownloadFild = ({id,className, accept, fieldType,placeholder,errorText, errorVisible, onChange, label, ...otherProps}) => {
    placeholder = placeholder || label;
    return (
    <div className={`input-box ${errorVisible ? 'error' : ''}`}>
        {fieldType === 'input' && (
            <div className="in-wr">
                <input placeholder={placeholder}
                   id={id}

                   accept={accept}
                   {...otherProps}
                   onChange={typeof onChange == 'function' ? onChange : false}/>
                    <label
                         className={className}>
                        {placeholder}
                    </label>
            </div>
            )
        }


        <label className="input-error" htmlFor={id}>{errorText}</label>
    </div>
    )
};

// Make ESLint happy again: add validation to props
DownloadFild.propTypes = {
    id:PropTypes.string,
    placeholder:PropTypes.string,
    //errorVisible:PropTypes.bool,
    errorText:PropTypes.string,
    onChange:PropTypes.func

};
DownloadFild.defaultProps = {
    errorText:'error',
    fieldType:'input',
    placeholder:'',
    //errorVisible:false,
    className:''

};

export default DownloadFild;
