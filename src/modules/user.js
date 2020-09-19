import { createAction, handleActions } from 'redux-actions';
import { put, call, takeLatest, takeEvery, delay } from 'redux-saga/effects';

import * as api from '../api/user';
import { setSignInInactive } from './modal';

const authorization = localStorage.getItem('authorization');

const initialState = {
  status: {
    isSignIn: false,
    isLoading: false,
    isReady: false,
  },
  info: {
    email: '',
    nickname: '',
    profileURL: '',
    description: '',
    audienceAmount: 0,
    likeAmount: 0,
  },
};

// action type
//.. signin
const SIGNIN_START = 'user/SIGNIN_START';
const SIGNIN_REQUEST = 'user/SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'user/SIGNIN_FAILURE';

//.. signup
const SIGNUP_START = 'user/SIGNUP_START';
const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

//.. signout
const SIGNOUT_START = 'user/SIGNOUT_START';
const SIGNOUT_REQUEST = 'user/SIGNOUT_REQUEST';
const SIGNOUT_SUCCESS = 'user/SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'user/SIGNOUT_FAILURE';

//.. audience
const AUDIENCE_AMOUNT_START = 'user/info/AUDIENCE_AMOUNT_START';
const AUDIENCE_AMOUNT_REQUEST = 'user/info/AUDIENCE_AMOUNT_REQUEST';
const AUDIENCE_AMOUNT_SUCCESS = 'user/info/AUDIENCE_AMOUNT_SUCCESS';
const AUDIENCE_AMOUNT_FAILURE = 'user/info/AUDIENCE_AMOUNT_FAILURE';

//.. like amount
const LIKE_AMOUNT_START = 'user/info/LIKE_AMOUNT_START';
const LIKE_AMOUNT_REQUEST = 'user/info/LIKE_AMOUNT_REQUEST';
const LIKE_AMOUNT_SUCCESS = 'user/info/LIKE_AMOUNT_SUCCESS';
const LIKE_AMOUNT_FAILURE = 'user/info/LIKE_AMOUNT_FAILURE';

//.. profile picture
const UPDATE_PROFILE_PICTURE_REQUEST =
  'user/info/UPDATE_PROFILE_PICTURE_REQUEST';
const UPDATE_PROFILE_PICTURE_SUCCESS =
  'user/info/UPDATE_PROFILE_PICTURE_SUCCESS';
const UPDATE_PROFILE_PICTURE_FAILURE =
  'user/info/UPDATE_PROFILE_PICTURE_FAILURE';

//.. nickname
const UPDATE_NICKNAME_REQUEST = 'user/info/UPDATE_NICKNAME_REQUEST';
const UPDATE_NICKNAME_SUCCESS = 'user/info/UPDATE_NICKNAME_SUCCESS';
const UPDATE_NICKNAME_FAILURE = 'user/info/UPDATE_NICKNAME_FAILURE';

//.. description
const UPDATE_DESCRIPTION_REQUEST = 'user/info/UPDATE_DESCRIPTION_REQUEST';
const UPDATE_DESCRIPTION_SUCCESS = 'user/info/UPDATE_DESCRIPTION_SUCCESS';
const UPDATE_DESCRIPTION_FAILURE = 'user/info/UPDATE_DESCRIPTION_FAILURE';

// action creator (sync)
//.. signin
const signInRequest = createAction(SIGNIN_REQUEST);
const signInSuccess = createAction(SIGNIN_SUCCESS, data => data);
const signInFailure = createAction(SIGNIN_FAILURE);

//.. signup
const signUpRequest = createAction(SIGNUP_REQUEST);
const signUpSuccess = createAction(SIGNUP_SUCCESS, data => data);
const signUpFailure = createAction(SIGNUP_FAILURE);

//.. signout
const signOutRequest = createAction(SIGNOUT_REQUEST);
const signOutSuccess = createAction(SIGNOUT_SUCCESS);
const signOutFailure = createAction(SIGNOUT_FAILURE);

//.. audience
const audienceAmountRequest = createAction(AUDIENCE_AMOUNT_REQUEST);
const audienceAmountSuccess = createAction(
  AUDIENCE_AMOUNT_SUCCESS,
  amount => amount
);
const audienceAmountFailure = createAction(AUDIENCE_AMOUNT_FAILURE);

//.. like amount
const likeAmountRequest = createAction(LIKE_AMOUNT_REQUEST);
const likeAmountSuccess = createAction(LIKE_AMOUNT_SUCCESS, amount => amount);
const likeAmountFailure = createAction(LIKE_AMOUNT_FAILURE);

//.. profile picture
const updateProfilePictureRequest = createAction(
  UPDATE_PROFILE_PICTURE_REQUEST
);
const updateProfilePictureSuccess = createAction(
  UPDATE_PROFILE_PICTURE_SUCCESS,
  picture => picture
);
const updateProfilePictureFailure = createAction(
  UPDATE_PROFILE_PICTURE_FAILURE
);

//.. nickname
const updateNicknameRequest = createAction(UPDATE_NICKNAME_REQUEST);
const updateNicknameSuccess = createAction(
  UPDATE_NICKNAME_SUCCESS,
  nickname => nickname
);
const updateNicknameFailure = createAction(UPDATE_NICKNAME_FAILURE);

//.. description
const updateDescriptionRequest = createAction(UPDATE_DESCRIPTION_REQUEST);
const updateDescriptionSuccess = createAction(
  UPDATE_DESCRIPTION_SUCCESS,
  nickname => nickname
);
const updateDescriptionFailure = createAction(UPDATE_DESCRIPTION_FAILURE);

// action creator (async)
//.. signin
export const signIn = createAction(SIGNIN_START);
/*
export const signIn = signInData => {
  return async (dispatch, getState) => {
    dispatch(signInRequest());
    try {
      const { headers, data, status } = await api.signIn(signInData);

      if (status === 200) {
        const { email, nickname, profileDescription, profileURL } = data;
        const { authorization } = headers;
        dispatch(
          signInSuccess({
            email,
            nickname,
            description: profileDescription,
            profileURL,
          })
        );
        localStorage.setItem('authorization', authorization);
        return true;
      } else {
        dispatch(signInFailure());
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure());
      return false;
    }
  };
};
*/

function* signInSaga(action) {
  yield put(signInRequest());
  console.log('signInSaga 시작');
  try {
    const { headers, data, status } = yield call(api.signIn, action.payload);
    console.log('signInSaga 진행 중');

    const { email, nickname, profileDescription, profileURL } = data;
    const { authorization } = headers;
    yield put(
      signInSuccess({
        email,
        nickname,
        description: profileDescription,
        profileURL,
      })
    );
    localStorage.setItem('authorization', authorization);
    yield put(setSignInInactive());
  } catch (error) {
    if (!!error.response) console.log(error.response);
    else console.log(error);
    alert('올바른 회원정보를 입력해주세요');

    yield put(signInFailure());
  }
}

// export function* userSaga() {
//   yield takeLatest(SIGNIN_START, signInSaga);
//   yield takeLatest(SIGNUP_START, signUpSaga);
//   yield takeLatest(SIGNOUT_START, signOutSaga);
// }

//.. signup
/*
export const signUp = signUpData => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    try {
      const { status, data } = await api.signUp(signUpData);

      if (status === 200) {
        dispatch(signUpSuccess());
        return true;
      } else {
        dispatch(signUpFailure());
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch(signUpFailure());
    }
  };
};
*/

export const signUp = createAction(SIGNUP_START, data => data);

function* signUpSaga(action) {
  yield put(signUpRequest());
  try {
    const { status, data } = yield call(api.signUp, action.payload);

    if (status === 200) {
      yield put(signUpSuccess());
      // yield true;
      // return true;
    } else {
      yield put(signUpFailure());
      // yield false;
      // return false;
    }
  } catch (error) {
    console.log(error);
    yield put(signUpFailure());
    // yield false;
    // return false;
  }
}

export const signUpOauth = (body, accessToken) => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    try {
      const { data, headers, status } = await api.oauthSignUp(
        body,
        accessToken
      );
      if (status === 200) {
        dispatch(signUpSuccess());
        return true;
      } else {
        dispatch(signUpFailure());
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch(signUpFailure());
    }
  };
};

export const signInOauth = (body, accessToken) => {
  return async (dispatch, getState) => {
    dispatch(signInRequest());
    try {
      const { data, headers, status } = await api.oauthSignIn(
        body,
        accessToken
      );
      if (status === 200) {
        const { authorization } = headers;
        localStorage.setItem('authorization', authorization);
        const { user } = data;
        const { email, nickname, profileDescription, profileURL } = user;
        dispatch(
          signInSuccess({
            email,
            nickname,
            description: profileDescription,
            profileURL,
          })
        );
        return true;
      } else {
        dispatch(signInFailure());
        return false;
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure());
    }
  };
};

//.. signout
export const signOut = createAction(SIGNOUT_START);

/*
export const signOut = () => {
  return (dispatch, getState) => {
    dispatch(signOutRequest());
    setTimeout(async () => {
      try {
        const { status } = await api.signOut(authorization);

        if (status === 204) {
          dispatch(signOutSuccess());
          localStorage.removeItem('authorization');
        } else dispatch(signOutFailure());
      } catch (error) {
        console.log(error);
        dispatch(signOutFailure());
      }
    }, 500);
  };
};
*/

function* signOutSaga() {
  yield put(signOutRequest());
  yield delay(500);

  try {
    const { status } = yield call(api.signOut, authorization);
    if (status === 204) {
      yield put(signOutSuccess());
      localStorage.removeItem('authorization');
    }
  } catch (error) {
    console.log(error);
    yield put(signOutFailure());
  }
}

export function* userSaga() {
  yield takeLatest(SIGNIN_START, signInSaga);
  yield takeLatest(SIGNUP_START, signUpSaga);
  yield takeLatest(SIGNOUT_START, signOutSaga);
}

export const getLikeAmount = createAction(LIKE_AMOUNT_START);
export const getAudienceAmount = createAction(AUDIENCE_AMOUNT_START);
/*
export const getLikeAmount = () => {
  return async (dispatch, getState) => {
    dispatch(likeAmountRequest());
    try {
      const { status, data } = await api.getLikeAmount(authorization);

      if (status === 200) {
        const { likeAmount } = data;
        dispatch(likeAmountSuccess(likeAmount));
      } else {
        dispatch(likeAmountFailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(likeAmountFailure());
    }
  };
};
*/

function* getLikeAmountSaga() {
  yield put(likeAmountRequest());
  try {
    const { status, data } = yield call(api.getLikeAmount, authorization);
    if (status === 200) {
      const { likeAmount } = data;
      yield put(likeAmountSuccess(likeAmount));
      console.log('like amount:', likeAmount);
    } else {
      yield put(likeAmountFailure());
    }
  } catch (error) {
    console.log(error);

    yield put(likeAmountFailure());
  }
}

/*
export const getAudienceAmount = () => {
  return async (dispatch, getState) => {
    dispatch(audienceAmountRequest());
    try {
      const { status, data } = await api.getAudienceAmount(authorization);
      if (status === 200) {
        const { audienceAmount } = data;
        dispatch(audienceAmountSuccess(audienceAmount));
      } else {
        dispatch(audienceAmountFailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(audienceAmountFailure());
    }
  };
};
*/

function* getAudienceAmountSaga() {
  yield put(audienceAmountRequest());
  try {
    const { status, data } = call(api.getAudienceAmount, authorization);
    if (status === 200) {
      const { audienceAmount } = data;
      yield put(audienceAmountSuccess(audienceAmount));
      console.log('audience amount:', audienceAmount);
    } else {
      yield put(audienceAmountFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(audienceAmountFailure());
  }
}

export function* amountSaga() {
  yield takeEvery(LIKE_AMOUNT_START, getLikeAmountSaga);
  yield takeEvery(AUDIENCE_AMOUNT_START, getAudienceAmountSaga);
}

export const updateNickname = nickname => {
  return async (dispatch, getState) => {
    dispatch(updateNicknameRequest());
    try {
      const { status, data } = await api.updateNickname(
        authorization,
        nickname
      );

      if (status === 200) dispatch(updateNicknameSuccess(nickname));
      else {
        dispatch(updateNicknameFailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(updateNicknameFailure());
    }
  };
};

export const updateProfilePicture = picture => {
  return async (dispatch, getState) => {
    dispatch(updateProfilePictureRequest());
    const formData = new FormData();
    formData.append('file', picture[0]);

    try {
      const { data, status } = await api.updateProfilePicture(
        authorization,
        formData
      );

      if (status === 200) {
        const { image_url } = data;
        dispatch(updateProfilePictureSuccess(image_url));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateProfilePictureFailure());
    }
  };
};

export const updateDescription = description => {
  return async (dispatch, getState) => {
    dispatch(updateDescriptionRequest());
    try {
      const { status, data } = await api.updateDescription(
        authorization,
        description
      );

      if (status === 200) dispatch(updateDescriptionSuccess(description));
      else {
        dispatch(updateDescriptionFailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(updateDescriptionFailure());
    }
  };
};

//.. singin 유지
const SET_MAINTAIN_SIGNIN = 'user/SET_MAINTAIN_SIGNIN';
const SET_ISREADY = 'user/SET_ISREADY';
const SET_USERINFO = 'user/SET_USERINFO';

export const maintainSignIn = createAction(SET_MAINTAIN_SIGNIN);
export const setReady = createAction(SET_ISREADY);
export const setUserInfo = createAction(SET_USERINFO, info => info);

// reducer
const userReducer = handleActions(
  //.. signin 유지
  {
    [SET_MAINTAIN_SIGNIN]: prevState => ({
      ...prevState,
      status: {
        ...prevState.status,
        isSignIn: true,
      },
    }),
    [SET_ISREADY]: prevState => ({
      ...prevState,
      status: {
        ...prevState.status,
        isReady: true,
      },
    }),
    [SET_USERINFO]: (prevState, action) => ({
      ...prevState,
      info: {
        ...prevState.info,
        email: action.payload.info.email,
        nickname: action.payload.info.nickname,
        profileURL: action.payload.info.profileURL,
        description: action.payload.info.profileDescription,
      },
    }),
    //.. signin
    [SIGNIN_REQUEST]: prevState => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: true,
        isReady: true,
      },
    }),
    [SIGNIN_SUCCESS]: (prevState, action) => ({
      ...prevState,
      status: {
        isSignIn: true,
        isLoading: false,
        isReady: true,
      },
      info: {
        ...prevState.info,
        email: action.payload.email,
        nickname: action.payload.nickname,
        profileURL: action.payload.profileURL,
        description: action.payload.description,
      },
    }),
    [SIGNIN_FAILURE]: prevState => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: false,
        isReady: true,
      },
    }),
    //.. signout
    [SIGNOUT_REQUEST]: prevState => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: true,
        isReady: true,
      },
    }),
    [SIGNOUT_SUCCESS]: (prevState, action) => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: false,
        isReady: true,
      },
      info: {
        email: '',
        nickname: '',
        profileURL: '',
        description: '',
        audienceAmount: 0,
        likeAmount: 0,
      },
    }),

    //.. audience amount
    [AUDIENCE_AMOUNT_REQUEST]: prevState => ({
      ...prevState,
    }),
    [AUDIENCE_AMOUNT_SUCCESS]: (prevState, action) => ({
      ...prevState,
      info: {
        ...prevState.info,
        audienceAmount: action.payload,
      },
    }),

    // like amount
    [LIKE_AMOUNT_REQUEST]: prevState => ({
      ...prevState,
    }),
    [LIKE_AMOUNT_SUCCESS]: (prevState, action) => ({
      ...prevState,
      info: {
        ...prevState.info,
        likeAmount: action.payload,
      },
    }),

    // nickname
    [UPDATE_NICKNAME_REQUEST]: prevState => ({
      ...prevState,
    }),
    [UPDATE_NICKNAME_SUCCESS]: (prevState, action) => ({
      ...prevState,
      info: {
        ...prevState.info,
        nickname: action.payload,
      },
    }),

    // profile picture
    [UPDATE_PROFILE_PICTURE_REQUEST]: prevState => ({
      ...prevState,
    }),
    [UPDATE_PROFILE_PICTURE_SUCCESS]: (prevState, action) => ({
      ...prevState,
      info: {
        ...prevState.info,
        profileURL: action.payload,
      },
    }),

    // description
    [UPDATE_DESCRIPTION_REQUEST]: prevState => ({
      ...prevState,
    }),
    [UPDATE_DESCRIPTION_SUCCESS]: (prevState, action) => ({
      ...prevState,
      info: {
        ...prevState.info,
        description: action.payload,
      },
    }),
  },
  initialState
);

export default userReducer;
