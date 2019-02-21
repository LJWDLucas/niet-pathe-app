import { toast } from 'react-toastify';
import * as actionTypes from '../redux/actionTypes';
import { post } from '../../../utils/api';
import { BASE_URL, TICKET_API, PERFORMANCE_API } from '../../../constants/fetch';
import { NO_DISCOUNT } from '../../../constants/purchase';
import { calculatePriceOfTickets } from '../../../redux/selectors';

export const setPurchaseProperty = (purchaseType, payload) => ({
  type: actionTypes.SET_PURCHASE_PROPERTY,
  payload,
  purchaseType
});

export const setPerformanceId = payload => ({
  type: actionTypes.PURCHASE_SET_PERFORMANCE_ID,
  payload
});

export const emptySeats = () => ({
  type: actionTypes.EMPTY_SEATS
});

export const setCalculatedDiscount = payload => ({
  type: actionTypes.SET_CALCULATED_DISCOUNT,
  payload
});

const updateSeatTaken = ({ performanceId, chair, row, id }, taken) => ({
  type: actionTypes.SET_SEAT_TAKEN,
  payload: {
    performanceId,
    chair,
    row,
    ticketId: id,
    taken
  }
});

const bookPerformanceSeat = ({ performanceId, chair, row, id }) => post({
  url: `${BASE_URL}${PERFORMANCE_API}/${performanceId}/seat`,
  data: {
    chair,
    row,
    ticketId: id
  }
});

const createTicket = payload => post({
  url: `${BASE_URL}${TICKET_API}`,
  data: payload
})
  .then(result => result.data);

export const calculateDiscount = () => (dispatch, getState) => dispatch(setCalculatedDiscount(calculatePriceOfTickets(getState())));

export const bookSeats = () => (dispatch, getState) => {
  const { purchase } = getState();
  toast.info('Een moment geduld aub. Uw bestelling wordt verwerkt.');
  return Promise.all(purchase.seats.map(seat => {
    const ticket = {
      performanceId: purchase.performanceId,
      chair: seat.chair,
      row: seat.row,
      price: seat.price,
      discount: seat.discount,
      name: purchase.name || 'Anoniem',
      email: purchase.email || 'Geen'
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

export const addSeat = payload => dispatch => {
  dispatch({
    type: actionTypes.PURCHASE_ADD_SEAT,
    payload
  });
  dispatch(calculateDiscount());
};

export const removeSeat = payload => dispatch => {
  dispatch({
    type: actionTypes.PURCHASE_REMOVE_SEAT,
    payload
  });
  dispatch(calculateDiscount());
};

export const setTicketDiscount = payload => dispatch => {
  dispatch({
    type: actionTypes.SET_TICKET_DISCOUNT,
    payload
  });
  dispatch(calculateDiscount());
};
