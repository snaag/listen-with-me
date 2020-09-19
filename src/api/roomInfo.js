import axios from 'axios';
const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

// add, remove 모두 주소 바뀜
export const getCurrentListener = async (playlist_id, authorization) =>
  axios.get(`${BASE_URL}/room/listener/playlist`, {
    params: {
      id: playlist_id,
    },
    headers: {
      authorization,
    },
  });

export const addCurrentListener = async (playlist_id, authorization) =>
  axios.post(
    `${BASE_URL}/room/listener/playlist`,
    {
      id: playlist_id,
    },
    {
      headers: {
        authorization,
      },
    }
  );

export const removeCurrentListener = async (playlist_id, authorization) =>
  axios.delete(`${BASE_URL}/room/listener/playlist`, {
    headers: {
      authorization,
    },
    params: {
      id: playlist_id,
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

// 1.
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

// 2.
export const getMusics = async (playListId, authorization) =>
  axios.get(`${BASE_URL}/music`, {
    headers: {
      authorization,
    },
    params: {
      id: playListId,
    },
  });

export const getLikeStatus = async (playlist_id, authorization) =>
  axios.get(`${BASE_URL}/likedlist`, {
    headers: {
      authorization,
    },
    params: {
      id: playlist_id,
    },
  });

export const setLikeStatus = async (playlist_id, authorization) =>
  axios({
    url: `${BASE_URL}/likelist`,
    method: 'PATCH',
    params: {
      id: playlist_id,
    },
    headers: {
      authorization,
    },
  });

export const removeLikeStatus = async (playlist_id, authorization) =>
  axios({
    url: `${BASE_URL}/unlikelist`,
    method: 'PATCH',
    params: {
      id: playlist_id,
    },
    headers: {
      authorization,
    },
  });
