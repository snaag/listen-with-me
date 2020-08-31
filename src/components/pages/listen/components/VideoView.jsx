import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoView = () => {
  let videoIndex = 0;
  const videoList = [
    'https://www.youtube.com/watch?v=G84LnbOUqFc',
    'https://www.youtube.com/watch?v=e413ilFWgcg',
    'https://www.youtube.com/watch?v=3T4KGzfgjRU',
    'https://www.youtube.com/watch?v=W8OKOIzA74o',
  ];
  const [currentVideoUrl, setCurrentVideoUrl] = useState(videoList[videoIndex]);
  return (
    <div style={{ backgroundColor: 'darksalmon', height: '200px' }}>
      <ReactPlayer
        style={{
          width: '100%',
          height: '100%',
        }}
        controls
        url={currentVideoUrl}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPause={() => console.log('onPause')}
        onEnded={() => setCurrentVideoUrl(videoList[++videoIndex])}
        onError={() => console.log('onError')}
      />
    </div>
  );
};

export default VideoView;
