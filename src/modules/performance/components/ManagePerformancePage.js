import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Performance from './Performance';

class ManagePerformancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  render() {
    const { initialized } = this.state;
    const { isCustomer } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <Performance />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isCustomer: state.entities.user.role === 0
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePerformancePage);

ManagePerformancePage.propTypes = {
  isCustomer: PropTypes.bool
};
