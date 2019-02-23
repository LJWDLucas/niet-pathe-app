import { combineReducers } from 'redux';
import purchase from '../modules/performance/redux/purchase';
import entities from './reducers/entities';
import reviews from '../modules/review/redux/review';

const rootReducer = combineReducers({
  entities,
  purchase,
  reviews
});

export default rootReducer;
