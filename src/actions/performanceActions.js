import { normalize } from 'normalizr';
import * as f from '../constants/fetch';
import { get } from '../utils/api';
import { performances, performance, hall } from '../constants/schemas';
import * as actionTypes from '../redux/actionTypes';

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
  url: `${f.BASE_URL}${f.HALL_API}/${hallId}`
})
  .then(result => {
    const normalized = normalize(result.data, hall);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.halls, entityType: 'halls' });
  });
