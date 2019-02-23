import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  unapproved: {},
};

const purchase = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REVIEWS: {
      return update(state, {
        unapproved: {
          $set: action.payload
        }
      });
    }
    default:
      return state;
  }
};

export default purchase;
