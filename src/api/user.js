import axios from 'axios';
const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

// 유저 인증과 관련한 api (일반)
export const signIn = async data =>
  axios.post(`${BASE_URL}/user/signin`, data, {
    withCredentials: true,
    credentials: 'include',
  });

export const signUp = async data => axios.post(`${BASE_URL}/user/signup`, data);

export const signOut = async authorization =>
  axios.get(`${BASE_URL}/user/signout`, {
    headers: {
      authorization,
    },
  });

// 유저 인증과 관련한 api (oauth)
export const oauthSignUp = async (body, accessToken) =>
  axios.post(`${BASE_URL}/user/oauth/google`, body, {
    headers: { accessToken },
  });

export const oauthSignIn = async (body, accessToken) =>
  // axios.post(`${BASE_URL}/user/oauth/google`, body, {
  axios.post(`${BASE_URL}/user/oauth/google-signin`, body, {
    headers: { accessToken },
  });

// 유저의 정보와 관련한 api
export const getLikeAmount = async authorization =>
  axios.get(`${BASE_URL}/user/profile/like`, {
    headers: { authorization },
  });

export const getAudienceAmount = async authorization =>
  axios.get(`${BASE_URL}/user/profile/audience`, {
    headers: {
      authorization,
    },
  });

export const updateNickname = async (authorization, nickname) =>
  axios({
    url: `${BASE_URL}/user/profile/nickname`,
    method: 'PATCH',
    data: {
      nickname,
    },
    headers: {
      authorization,
    },
  });

export const updateProfilePicture = async (authorization, formData) =>
  axios.post(`${BASE_URL}/user/profile/image`, formData, {
    headers: {
      authorization,
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateDescription = async (authorization, description) =>
  axios({
    url: `${BASE_URL}/user/profile/description`,
    method: 'PATCH',
    data: {
      description,
    },
    headers: {
      authorization,
    },
  });
