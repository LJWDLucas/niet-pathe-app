import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MoviesList from './MoviesList';
import { fetchPaginatedMovies } from '../actions/movieActions';

class MoviesListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.onMovieSelect = this.onMovieSelect.bind(this);
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  onMovieSelect(e) {
    const { history, match } = this.props;
    return history.push(`${match.path}/${e}`);
  }

  render() {
    const { initialized } = this.state;
    const { getMovies } = this.props;

    if (!initialized) return null;

    return (
      <MoviesList
        onMovieSelect={this.onMovieSelect}
        getMovies={getMovies}
      />
    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  getMovies: skip => dispatch(fetchPaginatedMovies(skip || 0))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesListPage);

MoviesListPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  getMovies: PropTypes.func
};
