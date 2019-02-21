import React from 'react';
import PropTypes from 'prop-types';
import InputBox from '../components/InputBox';
import Label from '../components/Label';

const InputLabelBox = ({ onChange, id, labelValue, hasError, ...restProps }) => (
  <div className="p-b-15 w-100">
    <Label htmlFor={id} value={labelValue} />
    <InputBox withClass={hasError ? 'inputbox error' : 'inputbox'} {...restProps} onChange={onChange} />
  </div>
);

export default InputLabelBox;

InputLabelBox.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  labelValue: PropTypes.string,
  hasError: PropTypes.bool
};
