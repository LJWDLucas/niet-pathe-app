import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VALUES, NAMES } from '../constants/purchase';
import { selectDiscountsForPerformance } from '../../../redux/selectors';
import { setTicketDiscount } from '../actions/purchaseActions';

const DiscountRow = ({ value, name }) => (
  <option value={value}>
    {name}
  </option>
);

DiscountRow.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string
};

const DiscountSelector = ({ discounts, setDiscount }) => (
  <div className="d-i-b">
    <div className="order-row" />
    <select defaultValue="-1" onChange={e => setDiscount(e.target.value)}>
      {discounts.map(discount => <DiscountRow key={VALUES[discount]} value={VALUES[discount]} name={NAMES[discount]} />)}
    </select>
  </div>
);

const mapStateToProps = state => ({
  discounts: selectDiscountsForPerformance(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setDiscount: discount => dispatch(setTicketDiscount({ discount, chair: ownProps.chair, row: ownProps.row }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscountSelector);

DiscountSelector.propTypes = {
  discounts: PropTypes.array
};
