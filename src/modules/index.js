import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import alongReducer from './along';
import userReducer from './user';
import modalReducer from './modal';
import mainReducer from './main';
import playListReducer from './playList';
import chatReducer, { chatSaga } from './chat';
import musicReducer from './music';
import roomReducer from './room';

export default combineReducers({
  user: userReducer,
  along: alongReducer,
  modal: modalReducer,
  main: mainReducer,
  playList: playListReducer,
  chat: chatReducer,
  music: musicReducer,
  room: roomReducer,
});

export function* rootSaga() {
  yield all([chatSaga()]);
}
