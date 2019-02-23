import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PurchaseListRow from './PurchaseListRow';
import Total from './Total';
import PerformanceContext from './PerformanceContext';

const totalPrice = seats => seats.reduce((acc, cur) => { acc += cur.price; return acc; }, 0);

const PurchaseList = props => {
  const { seats } = props;
  return (
    <React.Fragment>
      <ul>
        {seats.length === 0 && <div>Klik op een stoel in het bovenstaande vakje om een plek te reserveren.</div>}
        {seats.map(seat => (
          <PurchaseListRow
            key={`${seat.row}-${seat.chair}`}
            {...seat}
          />
        ))}
      </ul>
      {seats.length > 0 && <Total price={totalPrice(seats)} />}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  seats: state.purchase.seats,
});

const ConnectedPurchaseList = connect(mapStateToProps)(PurchaseList);

PurchaseList.propTypes = {
  seats: PropTypes.array,
};

const WrappedPurchaseList = props => (
  <PerformanceContext.Consumer>
    {({ performanceId }) => (
      <ConnectedPurchaseList {...props} performanceId={performanceId} />
    )}
  </PerformanceContext.Consumer>
);

export default WrappedPurchaseList;
