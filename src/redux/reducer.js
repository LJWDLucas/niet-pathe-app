import { combineReducers } from 'redux';
import entities from './reducers/entities';
import web from '../modules/web/redux/reducer';
import tickets from '../modules/tickets/redux/reducer';
import secure from '../modules/secure/redux/reducer';

const rootReducer = combineReducers({
  entities,
  web,
  tickets,
  secure
});

export default rootReducer;
