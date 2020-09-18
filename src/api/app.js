import axios from 'axios';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

export const maintainSignIn = async authorization =>
  axios.get(`${BASE_URL}/user/token`, {
    headers: {
      authorization,
    },
  });
