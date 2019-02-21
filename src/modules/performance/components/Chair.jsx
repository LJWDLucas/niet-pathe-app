import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getPerformanceChair, isSeatSelected } from '../../../redux/selectors';
import { addSeat, removeSeat } from '../actions/purchaseActions';

class Chair extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { performanceChair: { taken }, isSelected, performanceAddSeat, performanceRemoveSeat } = this.props;
    if (taken) return null;
    if (isSelected) {
      return performanceRemoveSeat();
    }
    return performanceAddSeat();
  }

  render() {
    const { performanceChair, isSelected } = this.props;
    return (
      <div
        className={classNames({
          chair: true,
          available: !performanceChair.taken,
          unavailable: performanceChair.taken,
          selected: isSelected
        })}
        onClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  performanceChair: getPerformanceChair(ownProps.performanceId, ownProps.row, ownProps.chair)(state),
  isSelected: isSeatSelected(ownProps.row, ownProps.chair)(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  performanceAddSeat: () => dispatch(addSeat({ chair: ownProps.chair, row: ownProps.row, discount: -1 })),
  performanceRemoveSeat: () => dispatch(removeSeat({ chair: ownProps.chair, row: ownProps.row }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chair);

Chair.propTypes = {
  performanceChair: PropTypes.object,
  isSelected: PropTypes.bool,
  performanceAddSeat: PropTypes.func,
  performanceRemoveSeat: PropTypes.func,
};
