import { combineReducers } from 'redux';
import purchase from '../modules/performance/redux/purchase';
import entities from './reducers/entities';
import web from '../modules/web/redux/reducer';
import tickets from '../modules/tickets/redux/reducer';
import secure from '../modules/secure/redux/reducer';

const rootReducer = combineReducers({
  entities,
  web,
  tickets,
  purchase,
  secure
});

export default rootReducer;
