import { normalize } from 'normalizr';
import * as f from '../../../constants/fetch';
import { get } from '../../../utils/api';
import { movies } from '../../../constants/schemas';
import * as actionTypes from '../../../redux/actionTypes';

export const getInitialMovies = limit => dispatch => get({
  url: `${f.BASE_URL}${f.MOVIE_API}/active/${limit}`
})
  .then(result => {
    const normalized = normalize(result.data, movies);
    return dispatch({ type: actionTypes.SET_ENTITIES, payload: normalized.entities.movies, entityType: 'movies' });
  });
