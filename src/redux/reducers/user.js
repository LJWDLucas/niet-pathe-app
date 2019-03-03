import * as actionTypes from '../actionTypes';

const initialState = {
  role: '',
  websiteUrl: '',
  auth: '',
  loggedInAs: ''
};

const entities = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default entities;
