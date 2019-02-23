import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BuyButton = ({ value, withClass, dispatch, ...rest }) => <button {...rest} className={withClass} type="button">{value}</button>;

const mapStateToProps = state => ({
  disabled: state.purchase.seats.length === 0
});

export default connect(mapStateToProps)(BuyButton);

BuyButton.propTypes = {
  value: PropTypes.string,
  withClass: PropTypes.string
};
