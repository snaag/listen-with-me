import axios from 'axios';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

export const getPlayList = async authorization =>
  axios.get(`${BASE_URL}/playlist/user`, {
    headers: {
      authorization,
    },
  });

export const editPlayListTitle = async (id, title, authorization) =>
  axios.patch(
    `${BASE_URL}/playlist?id=${id}`,
    { title },
    {
      headers: {
        authorization,
      },
    }
  );

export const deletePlayList = async (id, authorization) =>
  axios.delete(`${BASE_URL}/playlist?id=${id}`, {
    headers: {
      authorization,
    },
  });

export const createPlayList = async (list_title, entries, authorization) =>
  axios.post(
    `${BASE_URL}/playlist`,
    {
      list_title,
      entries,
    },
    {
      headers: {
        authorization,
      },
    }
  );
