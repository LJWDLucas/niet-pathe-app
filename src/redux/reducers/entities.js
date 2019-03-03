import update from 'immutability-helper';
import * as actionTypes from '../actionTypes';
import * as p from '../../modules/performance/redux/actionTypes';

const initialState = {
  movies: {},
  performances: {},
  halls: {},
  reviews: {},
  surveys: {},
  tickets: {},
  user: {}
};

const entities = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TO_INITIAL_STATE: {
      return {
        ...initialState,
        user: state.user
      };
    }
    case actionTypes.SET_ENTITIES: {
      return update(state, {
        [action.entityType]: {
          $set: action.payload
        }
      });
    }
    case actionTypes.UPDATE_ENTITY: {
      return update(state, {
        [action.entityType]: {
          [action.id]: {
            [action.property]: {
              $set: action.payload
            }
          }
        }
      });
    }
    case p.SET_SEAT_TAKEN: {
      const { performanceId, chair, row, taken, ticketId } = action.payload;
      const index = state.performances[performanceId].chairs.findIndex(c => c.chair === chair && c.row === row);
      const newSeats = [...state.performances[performanceId].chairs];
      newSeats.splice(index, 1, { chair, row, taken, ticketId });
      return update(state, {
        performances: {
          [performanceId]: {
            chairs: {
              $set: newSeats
            }
          }
        }
      });
    }
    default:
      return state;
  }
};

export default entities;
