import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  roomId: -1,
};

// action type
const SET_ROOM_ID = 'room/SET_ROOM_ID';

// action creator (sync)
export const setRoomId = createAction(SET_ROOM_ID, id => id);

// reducer
const roomReducer = handleActions(
  {
    [SET_ROOM_ID]: (prevState, action) => ({
      roomId: action.payload,
    }),
  },
  initialState
);

export default roomReducer;
