import React from 'react';
import Select from 'react-select';



function logChange(val) {
  console.log("Selected: " + val);
}
const Select = ({ name, value, options, onChange }) => (
    <Select
        name="form-field-name"
        value="one"
        options={options}
        onChange={logChange}
    />
);



// Make ESLint happy again: add validation to props
Select.propTypes = {
  options: React.PropTypes.array,
  onChange: React.PropTypes.func,
};

Select.defaultProps = {
  options: [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
  ],
};

export default Select;
