import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Hall from './Hall';
import MobileChairSelector from './MobileChairSelector';
import { initializePerformance, setToInitialState } from '../../../actions/actions';
import { getPerformanceMovie, getPerformanceHall } from '../../../redux/selectors';
import PerformanceContext from './PerformanceContext';
import Purchase from './Purchase';
import BackButton from '../../../components/BackButton';
import EmployeePurchase from './EmployeePurchase';
import { emptySeats } from '../actions/purchaseActions';
import { setShowLoader, setHideLoader } from '../../../actions/layoutActions';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { initPerformance, hideLoader, showLoader } = this.props;
    showLoader();
    return initPerformance()
      .then(() => {
        hideLoader();
        this.setState({
          initialized: true
        });
      });
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  render() {
    const { initialized } = this.state;
    const { performance, isCustomer } = this.props;

    if (!initialized) return null;
    return (
      <div id="performance">
        <PerformanceContext.Provider
          value={{
            performanceId: performance.id,
            hallId: performance.hallId,
            isCustomer
          }}
        >
          <Hall />
          <Media query="(max-width: 467px)">
            {matches => matches && (
              <div id="mobile-chair-selector">
                <MobileChairSelector />
              </div>
            )}
          </Media>
          {isCustomer && <Purchase />}
          {!isCustomer && <EmployeePurchase />}
        </PerformanceContext.Provider>
        <BackButton destination="/secure/performances" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCustomer: state.user.role === 0,
  performance: state.entities.performances[ownProps.match.params.performanceId],
  movie: getPerformanceMovie(ownProps.match.params.performanceId)(state),
  hall: getPerformanceHall(ownProps.match.params.performanceId)(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initPerformance: () => dispatch(initializePerformance(ownProps.match.params.performanceId)),
  unmount: () => {
    dispatch(setToInitialState());
    dispatch(emptySeats());
  },
  showLoader: () => dispatch(setShowLoader()),
  hideLoader: () => dispatch(setHideLoader())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Performance));

Performance.propTypes = {
  initPerformance: PropTypes.func,
  performance: PropTypes.object,
  isCustomer: PropTypes.bool
};
