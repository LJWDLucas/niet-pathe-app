import React from 'react';
import PropTypes from 'prop-types';

const InputBox = ({ withClass, ...props }) => <input className={withClass} {...props} />;

export default InputBox;

InputBox.propTypes = {
  withClass: PropTypes.string
};
