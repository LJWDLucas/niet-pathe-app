import { normalize } from 'normalizr';
import * as f from '../../../constants/fetch';
import { get } from '../../../utils/api';
import { movies, performances, performance } from '../../../constants/schemas';
import * as actionTypes from '../../../redux/actionTypes';

export const getInitialMovies = limit => dispatch => get({
  url: `${f.BASE_URL}${f.MOVIE_API}/active/${limit}`
})
  .then(result => {
    const normalized = normalize(result.data, movies);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.movies, entityType: 'movies' });
  });

export const getPerformancesByMovieId = movieId => dispatch => get({
  url: `${f.BASE_URL}${f.PERFORMANCE_API}/movie/${movieId}`
})
  .then(result => {
    const normalized = normalize(result.data, performances);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.performances, entityType: 'performances' });
  });

export const getPerformanceById = performanceId => dispatch => get({
  url: `${f.BASE_URL}${f.PERFORMANCE_API}/${performanceId}`
})
  .then(result => {
    const normalized = normalize(result.data, performance);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.performances, entityType: 'performances' });
  });

export const getHallById = hallId => dispatch => get({

});
