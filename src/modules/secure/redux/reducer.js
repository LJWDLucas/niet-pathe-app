import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  general: {},
};

const secure = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SECURE: {
      return update(state, {
        [action.secureType]: {
          $set: action.payload
        }
      });
    }
    default:
      return state;
  }
};

export default secure;
