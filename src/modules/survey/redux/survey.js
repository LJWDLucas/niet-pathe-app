import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  new: {
    title: "",
    questions: [{
      question: "",
      answer: "",
      answerRequired: false,
      rating: "",
      ratingRequired: false
    }],
    active: false,
  },
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_QUESTION: {
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
    case actionTypes.SET_PROPERTY: {
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
