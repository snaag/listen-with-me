import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  roomId: -1,
  isClosed: false, // 방이 닫겼는지 여부
  wantToStay: false, // 게스트가 이 곡 까지 듣기를 원하는지
};

// action type
const SET_ROOM_ID = 'room/SET_ROOM_ID';
const SET_IS_CLOSE = 'room/SET_IS_CLOSE';
const SET_WANT_TO_STAY = 'room/SET_WANT_TO_STAY';

// action creator (sync)
export const setRoomId = createAction(SET_ROOM_ID, id => id);
export const setIsClosed = createAction(SET_IS_CLOSE, isClosed => isClosed);
export const setWantToStay = createAction(SET_WANT_TO_STAY, isWant => isWant);

// reducer
const roomReducer = handleActions(
  {
    [SET_ROOM_ID]: (prevState, action) => ({
      ...prevState,
      roomId: action.payload,
    }),
    [SET_IS_CLOSE]: (prevState, action) => ({
      ...prevState,
      isClosed: action.payload,
    }),
    [SET_WANT_TO_STAY]: (prevState, action) => ({
      ...prevState,
      wantToStay: action.payload,
    }),
  },
  initialState
);

export default roomReducer;
