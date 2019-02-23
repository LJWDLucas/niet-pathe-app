import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Secure extends React.Component {
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
    const { location } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <Link to={`${location.pathname}/reviews`}>Goedkeuren reviews</Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Secure);
