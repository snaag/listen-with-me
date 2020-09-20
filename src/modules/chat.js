import { handleActions, createAction } from 'redux-actions';
import { put, takeLatest, delay } from 'redux-saga/effects';

// initial state
const initialState = {
  chats: [],
};

// action type
const ADD_CHAT = 'chat/ADD_CHAT';
const ADD_CHAT_END = 'chat/ADD_CHAT_END';
const SET_CHAT = 'chat/SET_CHAT';

// action creator
export const addChat = createAction(ADD_CHAT);
export const addChatEnd = createAction(ADD_CHAT_END);
export const setChat = createAction(SET_CHAT);

function* addChatSaga(action) {
  yield delay(200);
  yield put(addChatEnd(action.payload));
}

// reducer
const chatReducer = handleActions(
  {
    [ADD_CHAT_END]: (prevState, action) => ({
      chats: [...prevState.chats, action.payload],
    }),
    [SET_CHAT]: (prevState, action) => ({
      chats: [...action.payload],
    }),
  },
  initialState
);

export function* chatSaga() {
  yield takeLatest(ADD_CHAT, addChatSaga);
}

export default chatReducer;
