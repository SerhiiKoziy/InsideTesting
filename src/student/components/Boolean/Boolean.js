import React from 'react';


const Boolean = ({answerType,type,onChange}) => (
    <div>
        <div
            className={`btn btn--${type} `}
            onClick={typeof onChange === 'function' ? onChange.bind(this, 1) : false}
        >
            <span>Так</span>
        </div>
        <div
            className={`btn btn--${type} `}
            onClick={typeof onChange === 'function' ? onChange.bind(this, 0) : false}
        >
            <span>Ні</span>
        </div>

    </div>
);

// Make ESLint happy again: add validation to props
Boolean.propTypes = {
    type: React.PropTypes.string,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string
};

Boolean.defaultProps = {
    type: 'default',
};

export default Boolean;
