import { combineReducers } from 'redux';
import purchase from '../modules/performance/redux/purchase';
import entities from './reducers/entities';
import reviews from '../modules/review/redux/review';
import movies from '../modules/movies/redux/movies';

const rootReducer = combineReducers({
  entities,
  purchase,
  reviews,
  movies
});

export default rootReducer;
