let fakeData = [
  {
    id: 1,
    title: 'hello',
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 1,
    likeAmount: 10,
    audienceAmount: 11,
  },
  {
    id: 2,
    title: 'world',
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 1,
    likeAmount: 9,
    audienceAmount: 12,
  },
];

const initialState = {
  isModalOpen: false,
  myPlayList: fakeData,
  list_title: '',
  entries: [],
  music: [],
  searchInfo: {
    query: '',
    max: 0,
    key: '',
  },
};

const SET_ISMODALOPEN = 'SET_ISMODALOPEN';
const SET_MYPLAYLIST = 'SET_MYPLAYLIST';
const SET_LIST_TITLE = 'SET_LIST_TITLE';
const SET_ENTRIES = 'SET_ENTRIES';
const SET_MUSIC = 'SET_MUSIC';
const SET_QUERY = 'SET_QUERY';

const setIsModalOpen = isModalOpen => ({
  type: SET_ISMODALOPEN,
  isModalOpen,
});

const setMyPlayList = myPlayList => ({
  type: SET_MYPLAYLIST,
  myPlayList,
});

const setListTitle = list_title => ({
  type: SET_LIST_TITLE,
  list_title,
});

const setEntries = entries => ({
  type: SET_ENTRIES,
  entries,
});

const setMusic = music => ({
  type: SET_MUSIC,
  music,
});

const setQuery = query => ({
  type: SET_QUERY,
  query,
  max: 3,
  key: 'AIzaSyDnWENLbOv2iXF3sZHse_MjnRVrq-g-PBE',
});

export {
  setIsModalOpen,
  setMyPlayList,
  setListTitle,
  setEntries,
  setMusic,
  setQuery,
};

const playListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISMODALOPEN:
      return Object.assign({}, state, {
        isModalOpen: action.isModalOpen,
      });
    case SET_MYPLAYLIST:
      return Object.assign({}, state, {
        myPlayList: action.myPlayList,
      });
    case SET_LIST_TITLE:
      return Object.assign({}, state, {
        list_title: action.list_title,
      });
    case SET_ENTRIES:
      return Object.assign({}, state, {
        entries: action.entries,
      });
    case SET_MUSIC:
      return Object.assign({}, state, {
        music: action.music,
      });
    case SET_QUERY:
      return Object.assign({}, state, {
        searchInfo: {
          query: action.query,
          max: action.max,
          key: action.key,
        },
      });
    default:
      return state;
  }
};

export default playListReducer;
