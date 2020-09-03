const searchYouTube = ({ query, max, key }, callback) => {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${query}&maxResults=${max}&part=snippet&type=video&videoCategoryId=10`
  )
    .then(res => res.json())
    .then(json => callback(json.items));
};

export default searchYouTube;
