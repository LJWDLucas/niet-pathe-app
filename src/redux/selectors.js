import { createSelector } from 'reselect';
import * as constants from '../modules/performance/constants/purchase';

const getPerformances = state => state.entities.performances;
const getHalls = state => state.entities.halls;
const getMovies = state => state.entities.movies;
const getSelectedSeats = state => state.purchase.seats;
const getPurchasePerformanceId = state => state.purchase.performanceId;

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

export const selectDiscountsForPerformance = createSelector(
  getPurchasePerformanceId,
  id => [
    constants.NO_DISCOUNT,
    constants.STUDENT_DISCOUNT,
    constants.ELDERLY_DISCOUNT,
    constants.CINEMA_TICKET_DISCOUNT
  ]
);

export const calculatePriceOfTickets = createSelector(
  getPurchasePerformanceId,
  getPerformances,
  getSelectedSeats,
  getMovies,
  (id, performances, seats, movies) => {
    const basePrice = parseInt(movies[performances[id].movieId].runtime.substr(0, 1), 10) >= 2 ? constants.COST.EXTENDED : constants.COST.REGULAR;
    const threeDimensionalPrice = performances[id].threeDimensional ? constants.COST.THREE_DEE : 0;
    return seats.map(seat => {
      const total = basePrice + threeDimensionalPrice;
      const [discount] = [constants.COST[constants.MAP[seat.discount]]];
      return {
        ...seat,
        price: total + discount
      };
    });
  }
);
