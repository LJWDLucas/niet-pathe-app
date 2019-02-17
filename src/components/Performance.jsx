import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPerformanceById } from '../modules/web/actions/webActions';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { fetchPerformance } = this.props;
    return fetchPerformance()
      .then(() => this.setState({
        initialized: true
      }));
  }

  render() {
    const { initialized } = this.state;

    if (!initialized) return null;

    return <div>Performance</div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  performance: state.entities.performances[ownProps.match.params.performanceId]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPerformance: () => dispatch(getPerformanceById(ownProps.match.params.performanceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Performance);

Performance.propTypes = {

};
