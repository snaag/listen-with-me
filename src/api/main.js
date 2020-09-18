import axios from 'axios';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

export const getOpenRoom = async () => axios.get(`${BASE_URL}/playlist`);

export const listenAlong = async (nickname, authorization) =>
  axios.post(
    `${BASE_URL}/along`,
    { nickname },
    {
      headers: {
        authorization,
      },
    }
  );

export const listenRandom = async authorization =>
  axios.get(`${BASE_URL}/randomlist`, {
    headers: {
      authorization,
    },
  });
