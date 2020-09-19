import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

const VideoView = ({
  currentMusicId,
  roomId,
  isAlong,
  isHost,
  playNextMusic,
}) => {
  const { musics } = useSelector(({ music }) => music);
  const music = musics[currentMusicId];
  console.log('video view에 넘어온 music의 정보:', music);
  console.log('video view에 넘어온 roomId의 정보:', roomId);
  const { artist, musicURL, thumbnails, title } = music;

  const playNextSong = () => {
    if (isHost) {
      console.log('>>Host가 현재 곡을 다 들어서, 방의 다음 곡을 세팅합니다<<');
    } else {
      console.log('>>Guest가 현재 곡을 다 들어서, 다음 곡으로 넘어갑니다<<');
    }
    playNextMusic();
  };

  useEffect(() => {
    const initializeView = async () => {
      const authorization = localStorage.getItem('authorization');

      const result = await axios.get(`${BASE_URL}/room`, {
        params: {
          id: roomId,
        },
        headers: {
          authorization,
        },
      });

      console.log(result);
      // >>ERR currentMusic_id가 null이다
    };
    if (!isHost && isAlong) {
      // 따라듣고 있다면, 호스트의 현재 곡을 가져와서 재생합니다
      console.log(
        '>>Guest가 Host를 따라듣습니다. Guest는 Host의 현재 곡을 재생합니다<<'
      );
      initializeView();
    }
  }, [isAlong, isHost, roomId]);

  //

  return (
    <div className="video-view">
      <ReactPlayer
        className="video-view__player"
        width="100%"
        height="100%"
        controls
        url={musicURL}
        playing={false}
        // onReady={() => console.log('onReady')}
        // onStart={() => console.log('onStart')}
        // onPause={() => console.log('onPause')}
        onEnded={() => playNextSong()}
        // onError={() => console.log('onError')}
      />
    </div>
  );
};

export default VideoView;
