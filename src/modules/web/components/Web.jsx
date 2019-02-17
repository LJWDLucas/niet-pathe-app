import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInitialMovies } from '../actions/webActions';
import Performance from '../../../components/Performance';

class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { fetchInitialMovies } = this.props;
    return fetchInitialMovies()
      .then(() => this.setState({
        initialized: true
      }));
  }

  render() {
    const { initialized } = this.state;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <div>Web</div>
        <Performance />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  fetchInitialMovies: () => dispatch(getInitialMovies(10)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Web);

Web.propTypes = {
  fetchInitialMovies: PropTypes.func
};
