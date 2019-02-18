import { toast } from 'react-toastify';
import * as actionTypes from '../redux/actionTypes';
import { post } from '../../../utils/api';
import { BASE_URL, TICKET_API, PERFORMANCE_API } from '../../../constants/fetch';
import { NO_DISCOUNT } from '../../../constants/purchase';

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

export const emptySeats = () => ({
  type: actionTypes.EMPTY_SEATS
});

const updateSeatTaken = ({ performanceId, chair, row }, taken) => ({
  type: actionTypes.SET_SEAT_TAKEN,
  payload: {
    performanceId,
    chair,
    row,
    taken
  }
});

const bookPerformanceSeat = ({ performanceId, chair, row }) => post({
  url: `${BASE_URL}${PERFORMANCE_API}/${performanceId}/seat`,
  data: {
    chair,
    row
  }
});

const createTicket = payload => post({
  url: `${BASE_URL}${TICKET_API}`,
  data: payload
})
  .then(result => result.data);

export const bookSeats = () => (dispatch, getState) => {
  const { purchase } = getState();
  toast.info('Een moment geduld aub. Uw bestelling wordt verwerkt.');
  return Promise.all(purchase.seats.map(seat => {
    const ticket = {
      performanceId: purchase.performanceId,
      chair: seat.chair,
      row: seat.row,
      price: seat.price || 9,
      discount: seat.discount || NO_DISCOUNT,
      name: 'Danny Lucas',
      email: 'danny.lucas@test.nl'
    };
    return createTicket(ticket);
  }))
    .then(results => Promise.all(results.map(result => {
      dispatch(updateSeatTaken(result, true));
      return bookPerformanceSeat(result);
    })))
    .then(() => toast.success('Uw bestelling is verwerkt. U ontvangt een e-mail met uw tickets.'))
    .then(() => dispatch(emptySeats()))
    .catch(() => toast.warn('Oh jee, er is iets fout gegaan.'));
};
