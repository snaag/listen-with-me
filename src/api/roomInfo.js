import axios from 'axios';
const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

export const getCurrentListener = async (playlist_id, authorization) =>
  axios.get(`${BASE_URL}/room/listener`, {
    data: {
      playlist_id,
    },
    headers: {
      authorization,
    },
  });

export const getRoomStatus = async (roomId, authorization) =>
  axios.get(`${BASE_URL}/room`, {
    params: {
      id: roomId,
    },
    headers: {
      authorization,
    },
  });

export const createRoom = async (playlist_id, authorization) =>
  axios.post(
    `${BASE_URL}/room`,
    {
      playlist_id,
    },
    {
      headers: {
        authorization,
      },
    }
  );

export const destroyRoom = async (roomId, authorization) =>
  axios.delete(`${BASE_URL}/room`, {
    headers: {
      authorization,
    },
    params: {
      id: roomId,
    },
  });

export const getMusics = async (playListId, authorization) =>
  axios.get(`${BASE_URL}/music`, {
    headers: {
      authorization,
    },
    params: {
      id: playListId,
    },
  });
