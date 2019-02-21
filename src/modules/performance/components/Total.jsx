import React from 'react';
import PropTypes from 'prop-types';

const Total = ({ price }) => (
  <React.Fragment>
    <div className="line-holder">
      <div className="total-line" />
    </div>
    <div className="total-price">
      <div className="price">
        {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price)}
      </div>
    </div>
  </React.Fragment>
);

export default Total;

Total.propTypes = {
  price: PropTypes.number
};
