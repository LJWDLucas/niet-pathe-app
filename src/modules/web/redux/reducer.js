import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
  general: {},
};

const web = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WEB: {
      return update(state, {
        [action.webType]: {
          $set: action.payload
        }
      });
    }
    default:
      return state;
  }
};

export default web;
