import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import * as actionTypes from '../redux/actionTypes';
import BackButton from '../../../components/BackButton';
import { postMovie } from '../actions/movieActions';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
  }

  updateProperty(value, property) {
    const { editMovie } = this.props;
    return editMovie(value, property);
  }

  saveMovie() {
    const { postNewMovie, history } = this.props;
    return postNewMovie()
      .then(id => history.push(`/secure/movies/${id}`));
  }

  render() {
    const { movie } = this.props;

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
        <button type="button" className="btn btn-success" onClick={this.saveMovie}>Opslaan</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movies.new
});

const mapDispatchToProps = dispatch => ({
  editMovie: (value, property) => dispatch({
    type: actionTypes.UPDATE_NEW_MOVIE,
    property,
    payload: value
  }),
  postNewMovie: () => dispatch(postMovie())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);

AddMovie.propTypes = {
  movie: PropTypes.object,
  editMovie: PropTypes.func,
  postNewMovie: PropTypes.func
};
