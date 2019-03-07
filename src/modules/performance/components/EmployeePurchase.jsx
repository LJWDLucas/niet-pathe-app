import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookSeats, setPurchaseProperty } from '../actions/purchaseActions';
import InputLabelBox from '../../../composed/InputLabelBox';
import TitleList from './TitleList';
import BuyButton from './BuyButton';

const EmployeePurchase = ({ purchaseTickets }) => (
  <div id="purchase" className="col-lg-5 col-md-6 col-sm-12 flex-wrap justify-content-center">
    <TitleList title="De bestelling" />
    <BuyButton withClass="btn btn-success" onClick={purchaseTickets} value="Kopen" />
  </div>
);

const mapDispatchToProps = dispatch => ({
  purchaseTickets: () => dispatch(bookSeats()),
});

export default connect(null, mapDispatchToProps)(EmployeePurchase);

EmployeePurchase.propTypes = {
  purchaseTickets: PropTypes.func,
  setName: PropTypes.func,
  setEmail: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
};
