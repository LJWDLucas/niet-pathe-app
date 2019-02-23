import { normalize } from 'normalizr';
import { api } from "../../../utils/api";
import * as constants from '../constants/reviewConstants';
import * as schemas from '../constants/schemas';
import * as actionTypes from '../redux/actionTypes';
import { SET_ENTITIES } from '../../../redux/actionTypes';

export const setReviews = payload => ({
  type: actionTypes.SET_REVIEWS,
  payload
});

export const fetchUnapprovedReviews = () => dispatch => api({
  url: `${constants.BASE_URL}${constants.REVIEW_API}/unapproved`
})
  .then(result => {
    const normalized = normalize(result.data, schemas.reviews);
    return dispatch(setReviews(normalized.entities.reviews));
  });

export const fetchReview = id => dispatch => api({
  url: `${constants.BASE_URL}${constants.REVIEW_API}/${id}`
})
  .then(result => {
    const normalized = normalize(result.data, schemas.review);
    return dispatch({ type: SET_ENTITIES, payload: normalized.entities.review, entityType: 'reviews' });
  });
