import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ title }) => <h1 className="gray-title">{title}</h1>;

export default Title;

Title.propTypes = {
  title: PropTypes.string
};
