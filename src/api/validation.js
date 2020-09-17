import axios from 'axios';
const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

export const something = async (type, value) =>
  axios.get(`${BASE_URL}/user/${type}`, {
    params: {
      [type]: value,
    },
  });
