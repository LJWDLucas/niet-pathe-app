import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  unapproved: {},
  review: {
    name: "",
    movieId: "",
    comment: ""
  }
};

const purchase = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_UNAPPROVED_REVIEWS: {
      return update(state, {
        unapproved: {
          $set: action.payload
        }
      });
    }
    case actionTypes.CONSTRUCT_REVIEW: {
      return update(state, {
        review: {
          [action.property]: {
            $set: action.payload
          }
        }
      });
    }
    case actionTypes.REMOVE_REVIEW: {
      return update(state, {
        unapproved: {
          $unset: [action.payload]
        }
      });
    }
    default:
      return state;
  }
};

export default purchase;
