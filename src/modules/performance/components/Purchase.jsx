import React from 'react';
import { connect } from 'react-redux';
import { bookSeats } from '../actions/purchaseActions';
import InputLabelBox from '../../../composed/InputLabelBox';
import TitleList from './TitleList';

const Purchase = ({ purchaseTickets }) => (
  <div id="purchase" className="col-lg-5 col-md-6 col-sm-12 flex-wrap justify-content-center">
    <InputLabelBox labelValue="Vul hier jouw naam in:" id="name" />
    <InputLabelBox labelValue="Vul hier jouw e-mailadres in:" id="email" />
    <TitleList title="Jouw bestelling" />
    <button type="button" onClick={purchaseTickets}>Kopen</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  purchaseTickets: () => dispatch(bookSeats())
});

export default connect(null, mapDispatchToProps)(Purchase);
