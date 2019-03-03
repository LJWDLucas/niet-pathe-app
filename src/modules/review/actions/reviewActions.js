import { normalize } from 'normalizr';
import serializer from 'serialize-javascript';
import { toast } from 'react-toastify';
import { del, get, post } from "../../../utils/api";
import * as constants from '../constants/reviewConstants';
import * as schemas from '../constants/schemas';
import * as actionTypes from '../redux/actionTypes';
import { SET_ENTITIES } from '../../../redux/actionTypes';

export const constructReview = (property, payload) => ({
  type: actionTypes.CONSTRUCT_REVIEW,
  property,
  payload
});

export const setUnapprovedReviews = payload => ({
  type: actionTypes.SET_UNAPPROVED_REVIEWS,
  payload
});

export const removeReview = reviewId => ({
  type: actionTypes.REMOVE_REVIEW,
  payload: reviewId
});

export const fetchUnapprovedReviews = () => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.REVIEW_API}/unapproved`
})
  .then(result => {
    const normalized = normalize(result.data, schemas.reviews);
    return dispatch(setUnapprovedReviews(normalized.entities.reviews));
  });

export const fetchReview = id => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.REVIEW_API}/${id}`
})
  .then(result => {
    const normalized = normalize(result.data, schemas.review);
    return dispatch({ type: SET_ENTITIES, payload: normalized.entities.review, entityType: 'reviews' });
  });

export const deleteReview = (reviewId, removalId) => (dispatch, getState) => del({
  url: `${getState().user.websiteUrl}${constants.REVIEW_API}/${reviewId}/${removalId}`
})
  .then(() => dispatch(removeReview(reviewId)));

export const acceptReview = reviewId => (dispatch, getState) => post({
  url: `${getState().user.websiteUrl}${constants.REVIEW_API}/approve/${reviewId}`,
  headers: {
    'content-type': 'application/json'
  },
  data: {
    employeeId: getState().user.loggedInAs
  }
})
  .then(() => dispatch(removeReview(reviewId)));


export const postReview = () => (dispatch, getState) => {
  const { review } = getState().reviews;
  return post({
    url: `${getState().user.websiteUrl}${constants.REVIEW_API}/post`,
    data: {
      ...review,
      comment: serializer(review.comment)
    },
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(result => {
      localStorage.setItem(review.movieId, result.data.removalId);
      toast.info('Bedankt voor het opsturen van jouw review! Nadat jouw review is goedgekeurd zal deze op de website te zien zijn.');
      return result;
    });
};
