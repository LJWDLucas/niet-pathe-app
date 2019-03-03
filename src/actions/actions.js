import { getPerformanceById, getHallById } from '../modules/performance/actions/performanceActions';
import { getMovieById } from './movieActions';
import { setPerformanceId } from '../modules/performance/actions/purchaseActions';
import { SET_TO_INITIAL_STATE, SET_USER } from '../redux/actionTypes';

export const initializePerformance = performanceId => (dispatch, getState) => dispatch(getPerformanceById(performanceId))
  .then(() => {
    const { movieId, hallId } = getState().entities.performances[performanceId];
    dispatch(getMovieById(movieId));
    dispatch(getHallById(hallId));
    dispatch(setPerformanceId(performanceId));
    return null;
  });

export const setUser = (auth = null, loggedInAs = "Anonymous", role = 0, websiteUrl) => ({
  type: SET_USER,
  payload: {
    auth,
    loggedInAs,
    role,
    websiteUrl
  }
});

export const setToInitialState = () => ({
  type: SET_TO_INITIAL_STATE
});
