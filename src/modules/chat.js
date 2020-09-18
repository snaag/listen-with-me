import { handleActions, createAction } from 'redux-actions';

// initial state
const initialState = {
  chats: [],
};

// action type
const ADD_CHAT = 'chat/ADD_CHAT';
const SET_CHAT = 'chat/SET_CHAT';

// action creator
export const addChat = createAction(ADD_CHAT, chat => chat);
export const setChat = createAction(SET_CHAT, chats => chats);

// reducer
const chatReducer = handleActions(
  {
    [ADD_CHAT]: (prevState, action) => ({
      chats: [...prevState.chats, action.payload],
    }),
    [SET_CHAT]: (prevState, action) => ({
      chats: [...action.payload],
    }),
  },
  initialState
);

export default chatReducer;
