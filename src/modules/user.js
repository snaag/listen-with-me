import { createAction, handleActions } from 'redux-actions';
const axios = require('axios');

// const BASE_URL = 'http://localhost:4000';
const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

const authorization = localStorage.getItem('authorization');

const initialState = {
  status: {
    isSignIn: false,
    isLoading: false,
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
const SIGNIN_REQUEST = 'user/SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'user/SIGNIN_FAILURE';

//.. signup
const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

//.. signout
const SIGNOUT_REQUEST = 'user/SIGNOUT_REQUEST';
const SIGNOUT_SUCCESS = 'user/SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'user/SIGNOUT_FAILURE';

//.. audience
const AUDIENCE_AMOUNT_REQUEST = 'user/info/AUDIENCE_AMOUNT_REQUEST';
const AUDIENCE_AMOUNT_SUCCESS = 'user/info/AUDIENCE_AMOUNT_SUCCESS';
const AUDIENCE_AMOUNT_FAILURE = 'user/info/AUDIENCE_AMOUNT_FAILURE';

//.. like amount
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
const signIn = signInData => {
  console.log('SIGNIN DATA', signInData);
  return async (dispatch, getState) => {
    dispatch(signInRequest());
    try {
      const { headers, data, status } = await axios
        .post(`${BASE_URL}/user/signin`, signInData, {
          withCredentials: true,
          credentials: 'include',
        })
        .then(response => response)
        .catch(error => error.response);

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
      } else {
        dispatch(signInFailure());
      }
    } catch (error) {
      console.log('userjs', error.response);
      dispatch(signInFailure());
    }
  };
};

//.. signup
const signUp = signUpData => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    try {
      const { status, data } = await axios
        .post(`${BASE_URL}/user/signup`, signUpData)
        .then(response => response)
        .catch(error => error.response);

      if (status === 200) {
        dispatch(signUpSuccess());
        return true;
      } else {
        dispatch(signUpFailure());
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//.. signout
const signOut = () => {
  return (dispatch, getState) => {
    dispatch(signOutRequest());
    setTimeout(async () => {
      try {
        const { status } = await axios.get(`${BASE_URL}/user/signout`, {
          headers: {
            authorization,
          },
        });
        if (status === 204) dispatch(signOutSuccess());
        else dispatch(signOutFailure());
      } catch (error) {
        dispatch(signOutFailure());
      }
    }, 500);
  };
};

const getLikeAmount = () => {
  return async (dispatch, getState) => {
    dispatch(likeAmountRequest());
    try {
      const { status, data } = await axios.get(
        `${BASE_URL}/user/profile/like`,
        {
          headers: {
            authorization,
          },
        }
      );

      if (status === 200) {
        const { likeAmount } = data;
        dispatch(likeAmountSuccess(likeAmount));
      } else {
        dispatch(likeAmountFailure());
      }
    } catch (error) {
      dispatch(likeAmountFailure());
    }
  };
};

const getAudienceAmount = () => {
  return async (dispatch, getState) => {
    dispatch(audienceAmountRequest());
    try {
      const { status, data } = await axios.get(
        `${BASE_URL}/user/profile/audience`,
        {
          headers: {
            authorization,
          },
        }
      );

      if (status === 200) {
        const { audienceAmount } = data;
        dispatch(audienceAmountSuccess(audienceAmount));
      } else {
        dispatch(audienceAmountFailure());
      }
    } catch (error) {
      dispatch(audienceAmountFailure());
    }
  };
};

const updateNickname = nickname => {
  return async (dispatch, getState) => {
    dispatch(updateNicknameRequest());
    try {
      const { status, data } = await axios({
        url: `${BASE_URL}/user/profile/nickname`,
        method: 'PATCH',
        data: {
          nickname,
        },
        headers: {
          authorization,
        },
      });

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
const updateProfilePicture = picture => {
  return async (dispatch, getState) => {
    dispatch(updateProfilePictureRequest());
    const formData = new FormData();
    formData.append('file', picture);

    try {
      const result = await axios.post(
        `${BASE_URL}/user/profile/image`,
        formData,
        {
          headers: {
            authorization,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      dispatch(updateProfilePictureSuccess(picture));

      console.log(result);
    } catch (error) {
      console.log('error');
      console.log(error);
      console.log(error.response);
    }
    // try {
    //   const fd = new FormData(picture);

    // const { status, data } = await axios({
    //   url: `${BASE_URL}/user/profile/image`,
    //   method: 'PATCH',
    //   data: {
    //     file: picture,
    //   },
    //   headers: {
    //     authorization,
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    //   if (status === 200) dispatch(updateNicknameSuccess(picture));
    //   else {
    //     console.log(status, data);
    //     dispatch(updateNicknameFailure());
    //   }
    // } catch (error) {
    //   console.log(error);
    //   console.log(error.response);
    //   dispatch(updateNicknameFailure());
    // }
  };
};

const updateDescription = description => {
  return async (dispatch, getState) => {
    dispatch(updateDescriptionRequest());
    try {
      const { status, data } = await axios({
        url: `${BASE_URL}/user/profile/description`,
        method: 'PATCH',
        data: {
          description,
        },
        headers: {
          authorization,
        },
      });

      if (status === 200) dispatch(updateDescriptionSuccess(description));
      else {
        console.log(status, data);
        dispatch(updateDescriptionFailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(updateDescriptionFailure());
    }
  };
};

export {
  signIn,
  signUp,
  signOut,
  getLikeAmount,
  getAudienceAmount,
  updateProfilePicture,
  updateDescription,
  updateNickname,
};

// reducer
const userReducer = handleActions(
  {
    //.. signin
    [SIGNIN_REQUEST]: prevState => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: true,
      },
    }),
    [SIGNIN_SUCCESS]: (prevState, action) => ({
      ...prevState,
      status: {
        isSignIn: true,
        isLoading: false,
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
      },
    }),
    //.. signout
    [SIGNOUT_REQUEST]: prevState => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: true,
      },
    }),
    [SIGNOUT_SUCCESS]: (prevState, action) => ({
      ...prevState,
      status: {
        isSignIn: false,
        isLoading: false,
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
    [SIGNOUT_FAILURE]: prevState => ({
      ...prevState,
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
    [AUDIENCE_AMOUNT_FAILURE]: prevState => ({
      ...prevState,
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
    [LIKE_AMOUNT_FAILURE]: prevState => ({
      ...prevState,
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
    [UPDATE_NICKNAME_FAILURE]: prevState => ({
      ...prevState,
    }),
    // profile picture
    [UPDATE_PROFILE_PICTURE_REQUEST]: prevState => ({
      ...prevState,
    }),
    [UPDATE_PROFILE_PICTURE_SUCCESS]: (prevState, action) => {
      console.log(action);
      return {
        ...prevState,
        info: {
          ...prevState.info,
          profileURL: action.payload,
        },
      };
    },
    [UPDATE_PROFILE_PICTURE_FAILURE]: prevState => ({
      ...prevState,
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
    [UPDATE_DESCRIPTION_FAILURE]: prevState => ({
      ...prevState,
    }),
  },
  initialState
);

export default userReducer;
