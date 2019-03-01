import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  maxNumberOfMovies: 0,
  pagination: [],
  new: {
    title: "",
    runtime: "",
    year: "",
    cast: [],
    genres: ["To do"],
    posterUrl: "",
    description: "",
    language: "",
    active: false,
  },
  search: '',
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
    case actionTypes.UPDATE_NEW_MOVIE: {
      return update(state, {
        new: {
          [action.property]: {
            $set: action.payload
          }
        }
      });
    }
    case actionTypes.SET_INITIAL_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default movies;
