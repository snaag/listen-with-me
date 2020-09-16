let fakeData = [
  {
    id: 1,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hellohellohellohellohellohellohellohellohellohellohello',
    nickname: 'in',
    likeAmount: 10,
    audienceAmount: 1000,
  },
  {
    id: 2,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title:
      '헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로헬로',
    nickname: 'ho',
    likeAmount: 9,
    audienceAmount: 1000,
  },
  {
    id: 3,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
    audienceAmount: 1000,
  },
  {
    id: 4,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
    audienceAmount: 1000,
  },
  {
    id: 5,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
    audienceAmount: 1000,
  },
  {
    id: 6,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
    audienceAmount: 1000,
  },
  {
    id: 7,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
    audienceAmount: 1000,
  },
  {
    id: 8,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
    audienceAmount: 1000,
  },
  {
    id: 9,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
    audienceAmount: 1000,
  },
  {
    id: 10,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
    audienceAmount: 1000,
  },
];

const initialState = {
  isModalOpen: false,
  myPlayList: [],
  list_title: '',
  entries: [],
  music: '',
  searchInfo: {
    query: '',
    max: 3,
    key: 'AIzaSyDnWENLbOv2iXF3sZHse_MjnRVrq-g-PBE',
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
  max: initialState.searchInfo.max,
  key: initialState.searchInfo.key,
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
