import React from 'react';


const CheckBox = ({classType, type, onChange, label, answerId ,defaultChecked, name, key }) => (
    <div className={`checkbox-wr ${classType}`} key={key}>
      <input type={type} id={`featured-${answerId}`} defaultChecked={defaultChecked} name={name}
             onChange={typeof onChange === 'function' ? onChange : false}/>
      <label htmlFor={`featured-${answerId}`}>{label}</label>
    </div>
);

// Make ESLint happy again: add validation to props
CheckBox.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  //label: React.PropTypes.string,
  //answerId: React.PropTypes.number,
  classType: React.PropTypes.string
};

CheckBox.defaultProps = {
  type: 'default',
    defaultChecked:false
};

export default CheckBox;