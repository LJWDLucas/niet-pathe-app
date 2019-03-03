import { normalize } from 'normalizr';
import * as constants from '../constants/fetch';
import { get } from '../../../utils/api';
import { surveys, survey } from '../constants/schemas';
import { SET_ENTITIES, UPDATE_ENTITY } from '../redux/actionTypes';

export const setSurveys = payload => ({
  type: SET_ENTITIES,
  entityType: 'surveys',
  payload
});

export const setSurvey = payload => ({
  type: UPDATE_ENTITY,
  entityType: 'surveys',
  id: payload.id,
  payload
});

export const fetchAllSurveys = () => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.SURVEY_API}`
})
  .then(result => {
    const normalizedData = normalize(result.data, surveys);
    return dispatch(setSurveys(normalizedData.entities.surveys));
  });

export const fetchSurvey = surveyId => (dispatch, getState) => get({
  url: `${getState().user.websiteUrl}${constants.SURVEY_API}/${surveyId}`
})
  .then(result => {
    const normalizedData = normalize(result.data, survey);
    return dispatch(setSurveys(normalizedData.entities.surveys));
  });
