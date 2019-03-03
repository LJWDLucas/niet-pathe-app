import { normalize } from 'normalizr';
import * as f from '../modules/performance/constants/fetch';
import { get } from '../utils/api';
import { movies, movie } from '../modules/performance/constants/schemas';
import * as actionTypes from '../redux/actionTypes';

export const getMovieById = movieId => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${f.MOVIE_API}/${movieId}`
})
  .then(result => {
    const normalized = normalize(result.data, movie);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.movies, entityType: 'movies' });
  });

export const getInitialMovies = limit => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${f.MOVIE_API}/active/${limit}`
})
  .then(result => {
    const normalized = normalize(result.data, movies);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.movies, entityType: 'movies' });
  });
