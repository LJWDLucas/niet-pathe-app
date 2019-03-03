import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import Hall from './Hall';
import MobileChairSelector from './MobileChairSelector';
import { initializePerformance, setToInitialState } from '../../../actions/actions';
import { getPerformanceMovie, getPerformanceHall } from '../../../redux/selectors';
import PerformanceContext from './PerformanceContext';
import Purchase from './Purchase';
import BackButton from '../../../components/BackButton';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { initPerformance } = this.props;
    return initPerformance()
      .then(() => this.setState({
        initialized: true
      }));
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  render() {
    const { initialized } = this.state;
    const { performance } = this.props;

    if (!initialized) return null;
    return (
      <div id="performance">
        <PerformanceContext.Provider
          value={{
            performanceId: performance.id,
            hallId: performance.hallId
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
        </PerformanceContext.Provider>
        <BackButton destination="/secure/performances" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  performance: state.entities.performances[ownProps.match.params.performanceId],
  movie: getPerformanceMovie(ownProps.match.params.performanceId)(state),
  hall: getPerformanceHall(ownProps.match.params.performanceId)(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initPerformance: () => dispatch(initializePerformance(ownProps.match.params.performanceId)),
  unmount: () => dispatch(setToInitialState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Performance));

Performance.propTypes = {
  initPerformance: PropTypes.func,
  performance: PropTypes.object
};
