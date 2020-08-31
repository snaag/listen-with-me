import { combineReducers } from 'redux';
import alongReducer from './along';

export default combineReducers({
  along: alongReducer,
});
