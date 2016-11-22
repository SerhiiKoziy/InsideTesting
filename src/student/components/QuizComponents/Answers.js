import React, {PropTypes} from 'react';

import Boolean from '../Boolean/Boolean'
import CheckBox from '../CheckBox/CheckBox'

import TextField from '../TextField/TextField'
const Answers = ({answerType, title,onChange,value, questionId ,answerId, ...props}) => {
    let component;
    switch (answerType) {
        case 'text':
            component = (
                <TextField
                    fieldType="textarea"
                    rows="6"
                    placeholder="Введіть відповідь"
                    onChange={onChange}
                />);
            break;
        case 'select':
            component = (
                <CheckBox name={`${answerType}-${questionId}`}
                          type={'radio'}
                          value={value}
                          onChange={onChange}
                />);
            break;
        case 'multiselect':
            component = (
                
                
                <CheckBox name={`${answerType}-${questionId}`}
                          value={value}
                          type={'checkbox'}
                          onChange={onChange}
                />);

            break;
        case 'opinion':
            component = (
                <div>
                    {
                        Array.from(Array(10)).map((el, i) => (

                            <CheckBox
                                {...props}
                                label={i + 1}
                                type='radio'
                                       name={`${answerType}-${questionId}`}
                                       answerId={`${answerType}-${questionId}-${i}`}
                                       classType={answerType}
                                       key={questionId+'-'+i}
                                       onChange={onChange.bind(this,i+1)}


                            />)
                        )

                    }

                </div>

            )


            break;
        case 'bit':
            component = (
                <Boolean type='boolean'
                         answerType={answerType}
                         onChange={onChange}
                />);

            break;
        default:
            throw new Error('unresolved type of answer');
            return false
            break;
    }
    return (
        React.cloneElement(component, {
            answerType,

            answerId: answerType === 'text' ? undefined: answerId,
            ...props
        })
    );

}

// Make ESLint happy again: add validation to props
Answers.propTypes = {};
Answers.defaultProps = {};

export default Answers;
