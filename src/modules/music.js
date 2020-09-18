import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  currentMusicId: -1,
  musics: {},
};

// action type
const UPDATE_CURRENT_MUSIC_ID = 'music/UPDATE_CURRENT_MUSIC_ID';
const UPDATE_MUSICS = 'music/UPDATE_MUSICS';
const PLAY_NEXT_MUSIC = 'music PLAY_NEXT_MUSIC';

// action creator (sync)
export const updateCurrentMusicId = createAction(
  UPDATE_CURRENT_MUSIC_ID,
  music => music
);
export const updateMusics = createAction(UPDATE_MUSICS, musics => musics);
export const playNextMusic = createAction(PLAY_NEXT_MUSIC);

// reducer
const musicReducer = handleActions(
  {
    [UPDATE_CURRENT_MUSIC_ID]: (prevState, action) => ({
      ...prevState,
      currentMusicId: action.payload,
    }),
    [PLAY_NEXT_MUSIC]: (prevState, action) => ({
      ...prevState,
      currentMusicId: prevState.currentMusicId + 1,
    }),
    [UPDATE_MUSICS]: (prevState, action) => ({
      ...prevState,
      musics: action.payload,
    }),
  },
  initialState
);

export default musicReducer;
