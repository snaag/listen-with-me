import axios from 'axios';

export const searchYouTube = async ({ key, query, max }) =>
  axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${query}&maxResults=${max}&part=snippet&type=video&videoCategoryId=10`
  );
