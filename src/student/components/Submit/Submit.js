import React from 'react';


const Submit = ({ type, onClick, children , ...props}) => (
  <button type="submit"
    className={`btn btn--${type}`}
      {...props}
    onClick={typeof onClick === 'function' ? onClick : false}
  >
  <span>{`${children}`}</span>
  </button>
);

// Make ESLint happy again: add validation to props
Submit.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
};

Submit.defaultProps = {

  type: 'default',
};

export default Submit;
