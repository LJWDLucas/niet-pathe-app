import { normalize } from 'normalizr';
import { toast } from 'react-toastify';
import { get, put, post } from "../../../utils/api";
import * as constants from '../constants/movieConstants';
import * as actionTypes from '../redux/actionTypes';
import { movies, movie } from '../constants/schemas';

export const setMovie = payload => ({ type: actionTypes.SET_ENTITIES, payload, entityType: 'movies' });

export const fetchMaximumMovies = () => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.MOVIE_API}/total`
})
  .then(result => dispatch({ type: actionTypes.SET_MOVIES_PROPERTY, movieProperty: 'maxNumberOfMovies', payload: result.data.total }));

export const fetchPaginatedMovies = skip => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.MOVIE_API}/pagination/${skip}`
})
  .then(result => {
    const normalized = normalize(result.data, movies);
    return dispatch(setMovie(normalized.entities.movies));
  });

export const getMovieById = movieId => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.MOVIE_API}/${movieId}`
})
  .then(result => {
    const normalized = normalize(result.data, movie);
    return dispatch(setMovie(normalized.entities.movies));
  });

export const updateMovie = movieId => (dispatch, getState) => {
  toast.info("De film wordt geüpdatet.");
  return put({
    url: `${getState().user.websiteUrl}${constants.MOVIE_API}/update`,
    data: getState().entities.movies[movieId]
  })
    .then(result => result.data.success ? toast.success("Gelukt") : toast.warn("Update is niet gelukt."));
};

export const postMovie = () => (dispatch, getState) => {
  toast.info("De film wordt opgeslagen.");
  return post({
    url: `${getState().user.websiteUrl}${constants.MOVIE_API}/new`,
    data: getState().movies.new
  })
    .then(result => {
      toast.success("Opslaan is gelukt!");
      const normalized = normalize(result.data.success, movie);
      dispatch({ type: actionTypes.SET_INITIAL_STATE });
      dispatch(setMovie(normalized.entities.movies));
      return result.data.success.id;
    });
};
