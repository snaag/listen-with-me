import { createAction, handleActions } from 'redux-actions';

const initialState = {
  isModalOpen: false,
  myPlayList: [],
  list_title: '',
  entries: [],
  music: '',
  searchInfo: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    query: '',
    max: 3,
  },
};

const SET_ISMODALOPEN = 'SET_ISMODALOPEN';
const SET_MYPLAYLIST = 'SET_MYPLAYLIST';
const SET_LIST_TITLE = 'SET_LIST_TITLE';
const SET_ENTRIES = 'SET_ENTRIES';
const SET_MUSIC = 'SET_MUSIC';
const SET_QUERY = 'SET_QUERY';

const setIsModalOpen = createAction(
  SET_ISMODALOPEN,
  isModalOpen => isModalOpen
);
const setMyPlayList = createAction(SET_MYPLAYLIST, myPlayList => myPlayList);
const setListTitle = createAction(SET_LIST_TITLE, list_title => list_title);
const setEntries = createAction(SET_ENTRIES, entries => entries);
const setMusic = createAction(SET_MUSIC, music => music);
const setQuery = createAction(SET_QUERY, query => query);

export {
  setIsModalOpen,
  setMyPlayList,
  setListTitle,
  setEntries,
  setMusic,
  setQuery,
};

const playListReducer = handleActions(
  {
    [SET_ISMODALOPEN]: (prevState, action) => ({
      ...prevState,
      isModalOpen: action.payload.isModalOpen,
    }),
    [SET_MYPLAYLIST]: (prevState, action) => ({
      ...prevState,
      myPlayList: action.payload.myPlayList,
    }),
    [SET_LIST_TITLE]: (prevState, action) => ({
      ...prevState,
      list_title: action.payload.list_title,
    }),
    [SET_ENTRIES]: (prevState, action) => ({
      ...prevState,
      entries: action.payload.entries,
    }),
    [SET_MUSIC]: (prevState, action) => ({
      ...prevState,
      music: action.payload.music,
    }),
    [SET_QUERY]: (prevState, action) => ({
      ...prevState,
      searchInfo: {
        ...prevState.searchInfo,
        query: action.payload.query,
      },
    }),
  },
  initialState
);

export default playListReducer;
