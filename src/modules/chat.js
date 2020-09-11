import { handleActions, createAction } from 'redux-actions';

// initial state
const initialState = {
  chats: [],
};

// action type
const ADD_CHAT = 'chat/ADD_CHAT';

// action creator
const addChat = createAction(ADD_CHAT, chat => chat);
export { addChat };

// reducer
const chatReducer = handleActions(
  {
    [ADD_CHAT]: (prevState, action) => ({
      chats: [...prevState.chats, action.payload],
    }),
  },
  initialState
);

export default chatReducer;
