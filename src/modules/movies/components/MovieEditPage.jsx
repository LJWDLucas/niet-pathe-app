import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionTypes from '../redux/actionTypes';
import BackButton from '../../../components/BackButton';
import { getMovieById } from '../../../actions/movieActions';
import { updateMovie } from '../actions/movieActions';

class MovieEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.updateProperty = this.updateProperty.bind(this);
    this.sendUpdatedMovie = this.sendUpdatedMovie.bind(this);
  }

  componentDidMount() {
    const { movie, fetchMovieById } = this.props;
    if (!movie) {
      return fetchMovieById()
        .then(() => this.setState({ initialized: true }));
    }
    this.setState({ initialized: true });
  }

  updateProperty(value, property) {
    const { editMovie } = this.props;
    return editMovie(value, property);
  }

  sendUpdatedMovie() {
    const { sendUpdatedMovie } = this.props;
    return sendUpdatedMovie();
  }

  render() {
    const { initialized } = this.state;
    const { movie } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <Table className="white-text">
          <thead>
            <tr>
              <th>Onderwerp</th>
              <th>Waarde</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Titel</td>
              <td>
                <input
                  type="text"
                  value={movie.title || ""}
                  onChange={e => this.updateProperty(e.target.value, 'title')}
                />
              </td>
            </tr>
            <tr>
              <td>Beschrijving</td>
              <td>
                <textarea
                  type="text"
                  value={movie.description || ""}
                  onChange={e => this.updateProperty(e.target.value, 'description')}
                />
              </td>
            </tr>
            <tr>
              <td>Jaar</td>
              <td>
                <input
                  type="text"
                  value={movie.year || ""}
                  onChange={e => this.updateProperty(e.target.value, 'year')}
                />
              </td>
            </tr>
            <tr>
              <td>Genres</td>
              <td>{movie.genres.join(', ')}</td>
            </tr>
            <tr>
              <td>Looptijd</td>
              <td>
                <input
                  type="text"
                  value={movie.runtime || ""}
                  onChange={e => this.updateProperty(e.target.value, 'runtime')}
                />
              </td>
            </tr>
            <tr>
              <td>Poster URL</td>
              <td>
                <input
                  type="text"
                  value={movie.posterUrl || ""}
                  onChange={e => this.updateProperty(e.target.value, 'posterUrl')}
                />
              </td>
            </tr>
            <tr>
              <td>Taal</td>
              <td>
                <input
                  type="text"
                  value={movie.language || ""}
                  onChange={e => this.updateProperty(e.target.value, 'language')}
                />
              </td>
            </tr>
            <tr>
              <td>Actief</td>
              <td>
                <input
                  type="checkbox"
                  checked={movie.active}
                  onChange={() => this.updateProperty(!movie.active, 'active')}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <BackButton destination="/secure/movies" />
        <button type="button" className="btn btn-success" onClick={this.sendUpdatedMovie}>Opslaan</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.entities.movies[ownProps.match.params.id]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMovieById: () => dispatch(getMovieById(ownProps.match.params.id)),
  editMovie: (value, property) => dispatch({
    type: actionTypes.UPDATE_ENTITY,
    property,
    entityType: 'movies',
    id: ownProps.match.params.id,
    payload: value
  }),
  sendUpdatedMovie: () => dispatch(updateMovie(ownProps.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieEditPage);

MovieEditPage.propTypes = {
  fetchMovieById: PropTypes.func,
  movie: PropTypes.object,
  editMovie: PropTypes.func,
  sendUpdatedMovie: PropTypes.func
};
