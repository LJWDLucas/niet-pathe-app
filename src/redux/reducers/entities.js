import update from 'immutability-helper';
import * as actionTypes from '../actionTypes';

const initialState = {
  movies: {},
  performances: {},
  halls: {},
  reviews: {},
  surveys: {},
  tickets: {}
};

const entities = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ENTITIES: {
      return update(state, {
        [action.entityType]: {
          $set: action.payload
        }
      });
    }
    default:
      return state;
  }
};

export default entities;
