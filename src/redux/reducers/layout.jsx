import update from 'immutability-helper';

const initialState = {
  showLoader: false
};

const layout = (state = initialState, action) => {
  if (action.type === 'SET_LAYOUT') {
    return update(state, {
      showLoader: {
        $set: action.payload
      }
    });
  }
  return state;
};

export default layout;
