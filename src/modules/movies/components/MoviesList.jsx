import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMaximumMovies, fetchPaginatedMovies } from '../actions/movieActions';

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      selected: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getMovieCount, getMovies } = this.props;
    return Promise.all([getMovieCount(), getMovies()])
      .then(() => this.setState({ initialized: true }));
  }

  handleClick(page) {
    const { getMovies } = this.props;
    this.setState({ selected: page });
    return getMovies(page * 25);
  }

  render() {
    const { initialized, selected } = this.state;
    const { pagination, movies, onMovieSelect } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <Table responsive className="with-hover">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Jaar</th>
              <th>Genres</th>
              <th>Looptijd</th>
              <th>Taal</th>
              <th>Actief</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(movies).map(movie => (
              <tr key={movie.id} onClick={() => onMovieSelect(movie.id)}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.genres.join(', ')}</td>
                <td>{movie.runtime}</td>
                <td>{movie.language}</td>
                <td>{movie.active ? 'Ja' : 'Nee'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink previous href="#" />
          </PaginationItem>
          {pagination.map(page => (
            <PaginationItem active={selected === page} key={page} onClick={() => this.handleClick(page)}>
              <div className="page-link">
                {page}
              </div>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
        </Pagination>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  pagination: state.movies.pagination,
  movies: state.entities.movies
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMovieCount: () => dispatch(fetchMaximumMovies()),
  getMovies: skip => ownProps.getMovies(skip || 0)
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

MoviesList.propTypes = {
  onMovieSelect: PropTypes.func,
  movies: PropTypes.object,
  pagination: PropTypes.array
};
