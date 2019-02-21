import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';
import { connect } from 'react-redux';
import DiscountSelector from './DiscountSelector';
import { calculatePriceOfTickets } from '../../../redux/selectors';

const PurchaseListRow = ({ row, chair, priceList }) => {
  const { price } = priceList.find(seat => seat.row === row && seat.chair === chair);
  return (
    <li className="price-selector">
      <DiscountSelector row={row} chair={chair} />
      {price < 8.5 && (
        <React.Fragment>
          <ReactToolTip />
          <div className="circle" data-tip="Let op! Bij het afgeven van jouw kaartjes moet je kunnen bewijzen dat je recht hebt op de gekozen korting.">?</div>
        </React.Fragment>
      )}
      <div className="price-tag">{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price)}</div>
    </li>
  );
};

const mapStateToProps = state => ({
  priceList: calculatePriceOfTickets(state)
});

export default connect(mapStateToProps)(PurchaseListRow);

PurchaseListRow.propTypes = {
  row: PropTypes.number,
  chair: PropTypes.number,
  priceList: PropTypes.array
};
