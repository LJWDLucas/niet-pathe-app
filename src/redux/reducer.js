import { combineReducers } from 'redux';
import purchase from '../modules/performance/redux/purchase';
import performance from '../modules/performance/redux/performance';
import entities from './reducers/entities';
import reviews from '../modules/review/redux/review';
import movies from '../modules/movies/redux/movies';
import surveys from '../modules/survey/redux/survey';
import user from './reducers/user';

const rootReducer = combineReducers({
  entities,
  purchase,
  reviews,
  movies,
  performance,
  surveys,
  user
});

export default rootReducer;
