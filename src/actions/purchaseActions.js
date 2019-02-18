import * as actionTypes from '../redux/actionTypes';

export const addSeat = payload => ({
  type: actionTypes.PURCHASE_ADD_SEAT,
  payload
});

export const removeSeat = payload => ({
  type: actionTypes.PURCHASE_REMOVE_SEAT,
  payload
});

export const setPerformanceId = payload => ({
  type: actionTypes.PURCHASE_SET_PERFORMANCE_ID,
  payload
});
