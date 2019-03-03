import { normalize } from 'normalizr';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as f from '../constants/fetch';
import { get, post } from '../../../utils/api';
import { performances, performance, hall, halls } from '../constants/schemas';
import * as actionTypes from '../../../redux/actionTypes';
import * as p from '../redux/actionTypes';
import { getInitialMovies } from '../../../actions/movieActions';
import { flatten } from '../../../utils/helpers';

export const setPerformances = payload => ({
  type: actionTypes.SET_ENTITIES,
  payload,
  entityType: 'performances'
});

export const setPerformanceDate = payload => ({
  type: p.SET_DATE,
  payload
});

export const setHalls = payload => ({
  type: actionTypes.SET_ENTITIES,
  payload,
  entityType: 'halls'
});

export const setNewPerformanceProperty = (property, payload) => ({
  type: p.SET_PERFORMANCE_PROPERTY,
  property,
  payload
});

export const resetPerformance = () => ({
  type: p.SET_INITIAL_PERFORMANCE
});

export const getPerformancesByMovieId = movieId => dispatch => get({
  url: `${f.BASE_URL}${f.PERFORMANCE_API}/movie/${movieId}`
})
  .then(result => {
    const normalized = normalize(result.data, performances);
    return dispatch(setPerformances(normalized.entities.performances));
  });

export const getPerformanceById = performanceId => dispatch => get({
  url: `${f.BASE_URL}${f.PERFORMANCE_API}/${performanceId}`
})
  .then(result => {
    const normalized = normalize(result.data, performance);
    return dispatch(setPerformances(normalized.entities.performances));
  });

export const getHallById = hallId => dispatch => get({
  url: `${f.BASE_URL}${f.HALL_API}/${hallId}`
})
  .then(result => {
    const normalized = normalize(result.data, hall);
    return dispatch(setHalls(normalized.entities.halls));
  });

export const getAllHalls = () => dispatch => get({
  url: `${f.BASE_URL}${f.HALL_API}`
})
  .then(result => {
    const normalized = normalize(result.data, halls);
    return dispatch(setHalls(normalized.entities.halls));
  });

export const getPerformanceByDate = endpoint => (dispatch, getState) => {
  const { date } = getState().performance;
  let url;
  switch (endpoint) {
    case 'before':
      url = `${f.BASE_URL}${f.PERFORMANCE_API}/beforeDate`;
      break;
    case 'after':
      url = `${f.BASE_URL}${f.PERFORMANCE_API}/afterDate`;
      break;
    default:
      url = `${f.BASE_URL}${f.PERFORMANCE_API}/date`;
      break;
  }
  return post({ url, data: { date } })
    .then(result => {
      const normalized = normalize(result.data, performances);
      return dispatch(setPerformances(normalized.entities.performances || {}));
    });
};

export const initializeCreatePerformance = () => dispatch => Promise.all([
  dispatch(getAllHalls()),
  dispatch(getInitialMovies(50)),
]);

const validate = perf => {
  const errors = [];
  if (perf.movieId.length < 10) {
    errors.push("movieId");
  }
  if (perf.hallId.length < 10) {
    errors.push("hallId");
  }
  if (moment(perf.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
    errors.push("date");
  }
  if (!perf.date) {
    errors.push("date");
  }
  if (!perf.startTime) {
    errors.push("startTime");
  }
  if (!perf.endTime) {
    errors.push("endTime");
  }
  const start = moment(perf.startTime, "H:mm");
  const end = moment(perf.endTime, "H:mm");
  const duration = moment.duration(end.diff(start));
  const hours = parseInt(duration.asHours(), 10);
  if (end.isBefore(start)) {
    errors.push('endTime');
  }
  if (hours < 3) {
    errors.push('startTime');
  }
  return errors;
};

const createChairs = h => flatten(h.chairs.map(row => Array
  .from(Array(row.chairs), (_, x) => x + 1)
  .map(chair => ({
    ticketId: "",
    taken: false,
    row: row.row,
    chair
  }))));

export const createNewPerformance = () => (dispatch, getState) => {
  const _performance = getState().performance.new;
  const errors = validate(_performance);
  if (errors.length > 0) return Promise.resolve(errors);
  toast.info('De voorstelling wordt aangemaakt');
  const data = {
    threeDimensional: _performance.threeDimensional,
    movieId: _performance.movieId,
    startTime: moment(`${_performance.date} ${_performance.startTime}`).format('YYYY-MM-DD HH:mm:00'),
    endTime: moment(`${_performance.date} ${_performance.endTime}`).format('YYYY-MM-DD HH:mm:00'),
    hallId: _performance.hallId,
    chairs: createChairs(getState().entities.halls[_performance.hallId])
  };
  return post({
    url: `${f.BASE_URL}${f.PERFORMANCE_API}/create`,
    data
  })
    .then(() => {
      toast.success('Voorstelling is aangemaakt!');
      dispatch(resetPerformance());
      return [];
    })
    .catch(() => toast.warn('Er is iets fout gegaan.'));
};
