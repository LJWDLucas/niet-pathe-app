import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import BackButton from '../../../components/BackButton';
import { getMovieById } from '../../../actions/movieActions';

class MovieEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { movie, fetchMovieById } = this.props;
    if (!movie) {
      return fetchMovieById()
        .then(() => this.setState({ initialized: true }));
    }
    this.setState({ initialized: true });
  }

  render() {
    const { initialized } = this.state;
    const { movie } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <Table>
          <thead>
            <tr>
              <th>Onderwerp</th>
              <th>Waarde</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Titel</td>
              <td>{movie.title}</td>
            </tr>
            <tr>
              <td>Beschrijving</td>
              <td>{movie.description}</td>
            </tr>
            <tr>
              <td>Jaar</td>
              <td>{movie.year}</td>
            </tr>
            <tr>
              <td>Genres</td>
              <td>{movie.genres.join(', ')}</td>
            </tr>
            <tr>
              <td>Looptijd</td>
              <td>{movie.runtime}</td>
            </tr>
            <tr>
              <td>Taal</td>
              <td>{movie.language}</td>
            </tr>
            <tr>
              <td>Actief</td>
              <td>{movie.active ? 'Ja' : 'Nee'}</td>
            </tr>
          </tbody>
        </Table>
        <BackButton destination="/secure/movies" />
      </React.Fragment>

    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  movie: state.entities.movies[ownProps.match.params.id]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMovieById: () => dispatch(getMovieById(ownProps.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieEditPage);

MovieEditPage.propTypes = {
  fetchMovieById: PropTypes.func,
  movie: PropTypes.object
};
