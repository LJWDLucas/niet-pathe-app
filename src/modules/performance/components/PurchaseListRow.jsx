import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DiscountSelector from './DiscountSelector';

const PurchaseListRow = ({ row, chair, priceList }) => {
  const { price } = priceList.find(seat => seat.row === row && seat.chair === chair);
  return (
    <li className="price-selector">
      <DiscountSelector row={row} chair={chair} />
      <div className="price-tag">{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price)}</div>
    </li>
  );
};

const mapStateToProps = state => ({
  priceList: state.purchase.seats
});

export default connect(mapStateToProps)(PurchaseListRow);

PurchaseListRow.propTypes = {
  row: PropTypes.number,
  chair: PropTypes.number,
  priceList: PropTypes.array
};
