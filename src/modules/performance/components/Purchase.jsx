import React from 'react';
import { connect } from 'react-redux';
import { bookSeats } from '../actions/purchaseActions';

const Purchase = props => <button onClick={props.purchaseTickets}>Kopen</button>;

const mapDispatchToProps = dispatch => ({
  purchaseTickets: () => dispatch(bookSeats())
});

export default connect(null, mapDispatchToProps)(Purchase);
