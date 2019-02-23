import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    this.setState({
      initialized: true
    });
  }

  render() {
    const { initialized } = this.state;

    if (!initialized) return null;

    return <div>Tickets</div>;
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
