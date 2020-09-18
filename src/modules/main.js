import { createAction, handleActions } from 'redux-actions';

const initialState = {
  nickname: '',
  likedList: [],
};

const SET_NICKNAME = 'SET_NICKNAME';
const SET_LIKED_LIST = 'SET_LIKED_LIST';

const setNickname = createAction(SET_NICKNAME, nickname => nickname);
const setLikedList = createAction(SET_LIKED_LIST, likedList => likedList);

export { setNickname, setLikedList };

const mainReducer = handleActions(
  {
    [SET_NICKNAME]: (prevState, action) => ({
      ...prevState,
      nickname: action.payload.nickname,
    }),
    [SET_LIKED_LIST]: (prevState, action) => ({
      ...prevState,
      likedList: action.payload.likedList,
    }),
  },
  initialState
);

export default mainReducer;
