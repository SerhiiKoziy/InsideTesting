import React, {PropTypes} from 'react';
import MDSpinner from 'react-md-spinner';

const Spinner = ({}) => (
    <div className="spinner-wr">
        <MDSpinner
        color1="#006ec5"
        color2="#00b3e3"
        color3="#006ec5"
        color4="#00b3e3"

        size={100}
        duration={1500}
        />
    </div>
);

// Make ESLint happy again: add validation to props
Spinner.propTypes = {};
Spinner.defaultProps = {};

export default Spinner;
