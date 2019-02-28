import { normalize } from 'normalizr';
import { get } from "../../../utils/api";
import * as constants from '../constants/movieConstants';
import * as actionTypes from '../redux/actionTypes';
import { movies, movie } from '../constants/schemas';

export const fetchMaximumMovies = () => dispatch => get({
  url: `${constants.BASE_URL}${constants.MOVIE_API}/total`
})
  .then(result => dispatch({ type: actionTypes.SET_MOVIES_PROPERTY, movieProperty: 'maxNumberOfMovies', payload: result.data.total }));

export const fetchPaginatedMovies = skip => dispatch => get({
  url: `${constants.BASE_URL}${constants.MOVIE_API}/pagination/${skip}`
})
  .then(result => {
    const normalized = normalize(result.data, movies);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.movies, entityType: 'movies' });
  });

export const getMovieById = movieId => dispatch => get({
  url: `${constants.BASE_URL}${constants.MOVIE_API}/${movieId}`
})
  .then(result => {
    const normalized = normalize(result.data, movie);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.movies, entityType: 'movies' });
  });
