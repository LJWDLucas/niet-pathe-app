import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  seats: [],
  performanceId: "",
  name: null,
  email: null
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
    case actionTypes.SET_PURCHASE_PROPERTY: {
      return update(state, {
        [action.purchaseType]: {
          $set: action.payload
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
    case actionTypes.SET_TICKET_DISCOUNT: {
      const seats = [...state.seats];
      const index = state.seats.findIndex(seat => seat.row === action.payload.row && seat.chair === action.payload.chair);
      seats.splice(index, 1, action.payload);
      return update(state, {
        seats: {
          $set: seats
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
    case actionTypes.SET_CALCULATED_DISCOUNT: {
      return update(state, {
        seats: {
          $set: action.payload
        }
      });
    }
    default:
      return state;
  }
};

export default purchase;
