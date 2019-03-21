import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BackButton = ({ destination }) => (
  <Link to={destination}>
    <button
      type="button"
      className="btn btn-light"
    >
        Vorige
    </button>
  </Link>
);

export default withRouter(BackButton);

BackButton.propTypes = {
  destination: PropTypes.string
};
