import { createSelector } from 'reselect';

const getPerformances = state => state.entities.performances;
const getHalls = state => state.entities.halls;
const getMovies = state => state.entities.movies;
const getSelectedSeats = state => state.purchase.seats;

const getPerformance = performanceId => createSelector(
  getPerformances,
  performances => performances[performanceId]
);

export const getPerformanceHall = performanceId => createSelector(
  getPerformance(performanceId),
  getHalls,
  (performance = {}, halls) => halls[performance.hallId]
);

export const getPerformanceMovie = performanceId => createSelector(
  getPerformance(performanceId),
  getMovies,
  (performance = {}, movies) => movies[performance.movieId]
);

export const getPerformanceChair = (performanceId, row, chair) => createSelector(
  getPerformance(performanceId),
  performance => performance.chairs.find(c => row === c.row && c.chair === chair)
);

export const isSeatSelected = (row, chair) => createSelector(
  getSelectedSeats,
  seats => seats.some(seat => seat.row === row && seat.chair === chair)
);
