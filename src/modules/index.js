import { combineReducers } from 'redux';
import alongReducer from './along';
import userReducer from './user';
import modalReducer from './modal';

export default combineReducers({
  user: userReducer,
  along: alongReducer,
  modal: modalReducer,
});
