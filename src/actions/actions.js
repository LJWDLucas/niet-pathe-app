import { getPerformanceById, getHallById } from './performanceActions';
import { getMovieById } from './movieActions';

export const initializePerformance = performanceId => (dispatch, getState) => dispatch(getPerformanceById(performanceId))
  .then(() => {
    const { movieId, hallId } = getState().entities.performances[performanceId];
    dispatch(getMovieById(movieId));
    dispatch(getHallById(hallId));
    return null;
  });
