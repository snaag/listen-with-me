let fakeData = [
  {
    id: 1,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 2,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 3,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 4,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 5,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 6,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 7,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 8,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 9,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 10,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 11,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 12,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 13,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 14,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 15,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 16,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 17,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 18,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
  {
    id: 19,
    room_id: 12,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 20,
    room_id: 14,
    thumbnails:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
];

const initialState = {
  nickname: '',
  likedList: fakeData,
};

const SET_NICKNAME = 'SET_NICKNAME';
const SET_LIKED_LIST = 'SET_LIKED_LIST';

const setNickname = nickname => ({
  type: SET_NICKNAME,
  nickname,
});

const setLikedList = likedList => ({
  type: SET_LIKED_LIST,
  likedList,
});

export { setNickname, setLikedList };

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return Object.assign({}, state, {
        nickname: action.nickname,
      });
    case SET_LIKED_LIST:
      return Object.assign({}, state, {
        likedList: action.likedList,
      });
    default:
      return state;
  }
};

export default mainReducer;
