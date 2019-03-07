import { toast } from 'react-toastify';
import * as actionTypes from '../redux/actionTypes';
import { post, put } from '../../../utils/api';
import { TICKET_API, PERFORMANCE_API } from '../constants/fetch';
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

const bookPerformanceSeat = ({ performanceId, chair, row, id }, websiteUrl) => post({
  url: `${websiteUrl}${PERFORMANCE_API}/${performanceId}/seat`,
  data: {
    chair,
    row,
    ticketId: id
  }
});

const createTicket = (payload, websiteUrl) => post({
  url: `${websiteUrl}${TICKET_API}`,
  data: payload
})
  .then(result => result.data);

export const calculateDiscount = () => (dispatch, getState) => dispatch(setCalculatedDiscount(calculatePriceOfTickets(getState())));

export const undoBooking = (payload, performanceId) => (dispatch, getState) => put({
  url: `${getState().user.websiteUrl}${PERFORMANCE_API}/${performanceId}/seat`,
  data: payload
})
  .then(() => dispatch(updateSeatTaken({ performanceId, chair: payload.chair, row: payload.row, id: null }, false)));

export const bookSeats = () => (dispatch, getState) => {
  const { purchase } = getState();
  const { websiteUrl } = getState().user;
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
    return createTicket(ticket, websiteUrl);
  }))
    .then(results => Promise.all(results.map(result => {
      dispatch(updateSeatTaken(result, true));
      return bookPerformanceSeat(result, websiteUrl);
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
