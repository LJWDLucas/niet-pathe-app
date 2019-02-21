import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PurchaseListRow from './PurchaseListRow';

const PurchaseList = props => {
  const { seats } = props;
  return (
  <ul>
    {seats.length === 0 && <div>Klik op een stoel in het bovenstaande vakje om een plek te reserveren.</div>}
    {seats.map(seat => (
      <PurchaseListRow
        key={`${seat.row}-${seat.chair}`}
        {...seat}
      />
    ))}
  </ul>
  );
};

const mapStateToProps = state => ({
  seats: state.purchase.seats
});

export default connect(mapStateToProps)(PurchaseList);

PurchaseList.propTypes = {
  seats: PropTypes.array
};
