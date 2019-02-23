import { getPerformanceById, getHallById } from '../modules/performance/actions/performanceActions';
import { getMovieById } from './movieActions';
import { setPerformanceId } from '../modules/performance/actions/purchaseActions';
import { SET_ENTITIES } from '../redux/actionTypes';

export const initializePerformance = performanceId => (dispatch, getState) => dispatch(getPerformanceById(performanceId))
  .then(() => {
    const { movieId, hallId } = getState().entities.performances[performanceId];
    dispatch(getMovieById(movieId));
    dispatch(getHallById(hallId));
    dispatch(setPerformanceId(performanceId));
    return null;
  });

export const setUser = (auth = null, loggedInAs = 0) => ({
  type: SET_ENTITIES,
  entityType: 'user',
  payload: {
    auth,
    loggedInAs
  }
});
