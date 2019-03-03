import update from 'immutability-helper';
import moment from 'moment';
import * as actionTypes from './actionTypes';

const initialState = {
  date: moment().format('YYYY-MM-DD'),
  new: {
    threeDimensional: false,
    movieId: "",
    date: "",
    startTime: "",
    endTime: "",
    hallId: "",
    chairs: []
  }
};

const performance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATE:
      return update(state, {
        date: {
          $set: action.payload
        }
      });
    case actionTypes.SET_PERFORMANCE_PROPERTY: {
      return update(state, {
        new: {
          [action.property]: {
            $set: action.payload
          }
        }
      });
    }
    case actionTypes.SET_INITIAL_PERFORMANCE: {
      return {
        ...initialState,
        date: state.date,
      };
    }
    default:
      return state;
  }
};

export default performance;
