import { normalize } from 'normalizr';
import { toast } from 'react-toastify';
import * as constants from '../constants/fetch';
import { get, post } from '../../../utils/api';
import { surveys, survey } from '../constants/schemas';
import * as t from '../redux/actionTypes';

export const setSurveys = payload => ({
  type: t.SET_ENTITIES,
  entityType: 'surveys',
  payload
});

export const setSurvey = payload => ({
  type: t.UPDATE_ENTITY,
  entityType: 'surveys',
  id: payload.id,
  payload
});

export const setSurveyProperty = (property, payload) => ({
  type: t.SET_PROPERTY,
  property,
  payload
});

export const setInitialState = () => ({
  type: t.SET_INITIAL_STATE
});

export const addSurveyQuestion = payload => ({
  type: t.ADD_QUESTION,
  payload
});

export const removeSurveyQuestion = payload => ({
  type: t.REMOVE_QUESTION,
  payload
});

export const toggleSurveyQuestionCheckbox = (index, requiredType, payload) => ({
  type: t.TOGGLE_QUESTION_REQUIRED,
  index,
  requiredType,
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

export const postSurvey = () => (dispatch, getState) => post({
  url: `${getState().user.websiteUrl}${constants.SURVEY_API}`,
  data: getState().surveys.new
})
  .then(() => {
    toast.success("Je enquete is opgeslagen");
    dispatch(setInitialState());
  });
