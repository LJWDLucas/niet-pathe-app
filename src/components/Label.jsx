import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ id, value, ...props }) => <label htmlFor={id} {...props}>{value}</label>;

export default Label;

Label.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
};
