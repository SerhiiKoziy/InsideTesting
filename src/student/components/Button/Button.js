import React from 'react';


const Button = ({ className, type, onClick, children, ...other }) => (
  <div
      className={className || `btn btn--${type}`}
      onClick={typeof onClick === 'function' ? onClick : false}
      {...other}
  >

      <span>{`${children}`}</span>

  </div>
);

// Make ESLint happy again: add validation to props
Button.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
};

Button.defaultProps = {
  type: 'default',
};

export default Button;
