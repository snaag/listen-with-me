import { combineReducers } from 'redux';
import alongReducer from './along';
import userReducer from './user';
import mainReducer from './main';
import playListReducer from './playList';

export default combineReducers({
  user: userReducer,
  along: alongReducer,
  main: mainReducer,
  playList: playListReducer,
});
