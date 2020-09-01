import { combineReducers } from 'redux';
import alongReducer from './along';
import userReducer from './user';

export default combineReducers({
  user: userReducer,
  along: alongReducer,
});
