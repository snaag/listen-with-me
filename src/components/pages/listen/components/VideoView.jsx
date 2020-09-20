import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateCurrentMusicId } from '../../../../modules/music';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

const VideoView = ({
  currentMusicId,
  roomId,
  isHost,
  playNextMusic,
  socket,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { musics } = useSelector(({ music }) => music);
  const { isClosed, wantToStay } = useSelector(({ room }) => room);
  const { isAlong } = useSelector(({ along }) => along);
  // music: id, artist, musicURL, thumbnails, title
  const music = musics[currentMusicId] || musics[Object.keys(musics)[0]];
  const { musicURL } = music;

  useEffect(() => {
    // 음악이 바뀌었다는 메시지 보내주기
    if (isHost) {
      console.log('mounted');
      const changedMusic = musics[currentMusicId];
      console.log('onStart', changedMusic);
      socket.emit('changeMusic', {
        playlist_id: roomId,
        music_info: changedMusic,
      });
    }

    // eslint-disable-next-line
  }, [currentMusicId]);

  socket.on('changeMusic', ({ playlist_id, music_info }) => {
    const isAlong = JSON.parse(localStorage.getItem('isAlong'));
    console.log('isAlong', isAlong);
    if (!isHost && isAlong) {
      if (music_info === undefined) {
        console.log('허허', musics[Object.keys(musics)[0]]);
        dispatch(updateCurrentMusicId(musics[Object.keys(musics)[0]].id));
      } else {
        const { id, title } = music_info;
        console.log(
          `서버로부터 음악이 바뀌었다는 메시지를 받았습니다. 음악의 id는 ${id}, title은 ${title}, ${musics[id]}`
        );
        dispatch(updateCurrentMusicId(id));
      }
    }
  });

  const playNextSong = () => {
    if (isHost) {
      console.log('>>Host가 현재 곡을 다 들어서, 방의 다음 곡을 세팅합니다<<');
    } else {
      console.log('>>Guest가 현재 곡을 다 들어서, 다음 곡으로 넘어갑니다<<');
      if (isClosed) {
        console.log('방이 닫겼습니다');
        alert('방이 닫겼습니다');
        history.push('/');
      }
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
      // console.log(
      //   '>>Guest가 Host를 따라듣습니다. Guest는 Host의 현재 곡을 재생합니다<<'
      // );
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
        playing={true}
        // onReady={() => console.log('onReady')}
        // onStart={}
        // onPause={() => console.log('onPause')}
        onEnded={() => playNextSong()}
        // onError={() => console.log('onError')}
      />
    </div>
  );
};

export default VideoView;
