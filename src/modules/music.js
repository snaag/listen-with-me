import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  currentMusic: {},
  musics: [],
};

// action type
const UPDATE_CURRENT_MUSIC = 'music/UPDATE_CURRENT_MUSIC';
const UPDATE_MUSICS = 'music/UPDATE_MUSICS';

// action creator (sync)
export const updateCurrentMusic = createAction(
  UPDATE_CURRENT_MUSIC,
  music => music
);
export const updateMusics = createAction(UPDATE_MUSICS, musics => musics);

// reducer
const musicReducer = handleActions(
  {
    [UPDATE_CURRENT_MUSIC]: (prevState, action) => ({
      ...prevState,
      currentMusic: action.payload,
    }),
    [UPDATE_MUSICS]: (prevState, action) => ({
      ...prevState,
      musics: action.payload,
    }),
  },
  initialState
);

export default musicReducer;
