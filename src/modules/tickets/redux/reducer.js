import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  general: {},
};

const tickets = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TICKETS: {
      return update(state, {
        [action.ticketsType]: {
          $set: action.payload
        }
      });
    }
    default:
      return state;
  }
};

export default tickets;
