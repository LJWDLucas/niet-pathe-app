import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  maxNumberOfMovies: 0,
  pagination: [],
  search: ''
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES_PROPERTY: {
      const n = Math.ceil(action.payload / 25);
      return update(state, {
        [action.movieProperty]: {
          $set: action.payload
        },
        pagination: {
          $set: Array.from(Array(n), (_, x) => x)
        }
      });
    }
    default:
      return state;
  }
};

export default movies;
