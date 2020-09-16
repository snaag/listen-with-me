import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoView = ({ music }) => {
  const { artist, musicURL, thumbnails, title } = music;
  console.log(artist, musicURL, thumbnails, title);

  return (
    <div className="video-view">
      <ReactPlayer
        className="video-view__player"
        width="100%"
        height="100%"
        controls
        url={musicURL}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPause={() => console.log('onPause')}
        onEnded={() => console.log('ended')}
        onError={() => console.log('onError')}
      />
    </div>
  );
};

export default VideoView;
