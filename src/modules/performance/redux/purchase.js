import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  seats: [],
  performanceId: ""
};

const purchase = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ADD_SEAT: {
      return update(state, {
        seats: {
          $push: [action.payload]
        }
      });
    }
    case actionTypes.PURCHASE_REMOVE_SEAT: {
      const index = state.seats.findIndex(seat => seat.row === action.payload.row && seat.chair === action.payload.chair);
      return update(state, {
        seats: {
          $splice: [[index, 1]]
        }
      });
    }
    case actionTypes.PURCHASE_SET_PERFORMANCE_ID: {
      return update(state, {
        performanceId: {
          $set: action.payload
        }
      });
    }
    case actionTypes.EMPTY_SEATS: {
      return update(state, {
        seats: {
          $set: []
        }
      });
    }
    default:
      return state;
  }
};

export default purchase;
