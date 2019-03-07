import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getPerformanceChair, isSeatSelected } from '../../../redux/selectors';
import { addSeat, removeSeat, undoBooking } from '../actions/purchaseActions';
import Modal from '../../../components/Modal';

class Chair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showModal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
  }

  delete = choice => {
    if (choice === 0) this.setState({ showModal: false, open: false });
    const { removeBooking } = this.props;
    return removeBooking()
      .then(() => this.setState({ showModal: false, open: false }));
  }

  close(e) {
    e.stopPropagation();
    this.setState({ open: false });
  }

  handleClick() {
    const { performanceChair: { taken }, isSelected, performanceAddSeat, performanceRemoveSeat, isCustomer } = this.props;
    if (taken && isCustomer) return null;
    if (taken && !isCustomer) return this.setState({ open: true });
    if (isSelected) {
      return performanceRemoveSeat();
    }
    return performanceAddSeat();
  }


  render() {
    const { performanceChair, isSelected } = this.props;
    const { open, showModal } = this.state;
    return (
      <React.Fragment>
        {showModal && <Modal func={this.delete} />}
        <div
          className={classNames({
            chair: true,
            available: !performanceChair.taken,
            unavailable: performanceChair.taken,
            selected: isSelected
          })}
          onClick={this.handleClick}
        >
          {open && (
            <div className="cancel">
              <button
                className="btn btn-light"
                type="button"
                onClick={() => this.setState({ showModal: true })}
              >
                Verwijder
              </button>
              <button className="btn btn-light" type="button" onClick={e => this.close(e)}>x</button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  performanceChair: getPerformanceChair(ownProps.performanceId, ownProps.row, ownProps.chair)(state),
  isSelected: isSeatSelected(ownProps.row, ownProps.chair)(state)
});

const mapDispatchToProps = (dispatch, { row, chair, performanceId }) => ({
  performanceAddSeat: () => dispatch(addSeat({ chair, row, discount: -1 })),
  performanceRemoveSeat: () => dispatch(removeSeat({ chair, row })),
  removeBooking: () => dispatch(undoBooking({ row, chair }, performanceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chair);

Chair.propTypes = {
  performanceChair: PropTypes.object,
  isSelected: PropTypes.bool,
  performanceAddSeat: PropTypes.func,
  performanceRemoveSeat: PropTypes.func,
  isCustomer: PropTypes.bool,
  removeBooking: PropTypes.func
};
