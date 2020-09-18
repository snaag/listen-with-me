import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import io from 'socket.io-client';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
import PlayList from './components/playlist/PlayList';
import '../../../css/Listen.css';
const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

const ListenPage = ({
  isAlong,
  rId,
  currentMusic,
  musics,
  updateCurrentMusic,
  updateMusics,
  setRoomId,
  history,
}) => {
  const authorization = localStorage.getItem('authorization');
  let socket = io.connect(BASE_URL);

  const getMusics = async playListId => {
    try {
      console.log('getMusics 시작... playListId:', playListId);

      const { data, status } = await axios.get(`${BASE_URL}/music`, {
        headers: {
          authorization,
        },
        params: {
          id: playListId,
        },
      });
      if (status === 200) {
        console.log('getMusics 성공');

        return data;
      }
    } catch (error) {
      console.log(
        `해당 플레이리스트(${playListId})에 대한 음악들 불러오기 실패`
      );
      console.log(error.response);
    }
  };

  const getRoomStatus = async roomId => {
    // createdAt, currentMusic_id, host_id, id, playlist_id, updatedAt
    try {
      console.log('getRoomStatus 시작... roomId:', roomId);
      const { data, status } = await axios.get(`${BASE_URL}/room`, {
        params: {
          id: roomId,
        },
        headers: {
          authorization,
        },
      });

      if (status === 200) {
        console.log('getRoomStatus 성공');
        return data;
      } else {
        console.log('getRoomStatus 실패');
        console.log(data, status);
      }
    } catch (error) {
      console.log('getRoomStatus 실패');
      console.log(error.response);
    }
  };

  const destroyRoom = async roomId => {
    try {
      // const roomId = localStorage.getItem('roomId');
      console.log('destroyRoom 시작... roomId:', roomId);
      const result = await axios.delete(`${BASE_URL}/room`, {
        headers: {
          authorization,
        },
        params: {
          id: roomId,
        },
      });

      console.log(result);
      console.log('destroyRoom 성공');
      updateMusics([]);
      return true;

      // return result;
    } catch (error) {
      console.log('destroyRoom 실패');
      console.log(error.response);
      return false;
    }
  };

  const createRoom = async playListId => {
    try {
      console.log('createRoom 시작... playListId:', playListId);
      const { data, status } = await axios.post(
        `${BASE_URL}/room`,
        {
          playlist_id: playListId,
        },
        {
          headers: {
            authorization,
          },
        }
      );
      if (status === 201) {
        console.log('createRoom 성공');
        // localStorage.setItem('roomId', data.id);
        // const list = await getMusics();
        // updateCurrentMusic(list[0]);
        // updateMusics([...list]);
        return data.id;
      } else {
        console.log(status, data);
        console.log('createRoom 실패');
      }
    } catch (error) {
      console.log('createRoom 실패');
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log('>> ListePage에서 메시지를 받았습니다');

    socket.on('closeRoom', ({ playlist_id }) => {
      console.log(`${playlist_id} 가 닫겼습니다! 더 들으실건가요?`);
    });
  });

  useEffect(() => {
    const isHost = localStorage.getItem('isHost');
    console.log('isHost:', isHost);

    const initialzeRoom = async () => {
      if (isHost === 'true') {
        console.log('>제가 만든 방 입니다<');
        const playListId = localStorage.getItem('playListId');
        // 내가 방을 연 호스트인 경우,
        // 1. 방을 생성한다
        const roomId = await createRoom(playListId);
        console.log(`방이 생성되었고, 방의 id는 ${roomId} 입니다`);
        setRoomId(roomId);
        localStorage.setItem('roomId', roomId);
        // 2. 방의 음악 정보를 불러온다
        const list = await getMusics(playListId);
        updateMusics([...list]);
        updateCurrentMusic(list[0]);
      } else {
        // 내가 방에 게스트로 입장한 경우,
        // 1. 방의 음악 정보를 불러온다
        console.log('>제가 만든 방이 아닙니다<');
        const roomId = localStorage.getItem('roomId');
        setRoomId(roomId);
        console.log(`roomId의 정보 -> 값: ${roomId}, 타입: ${typeof roomId}`);
        const { playlist_id } = await getRoomStatus(roomId);
        const list = await getMusics(playlist_id);
        localStorage.setItem('playListId', playlist_id);

        updateMusics([...list]);
        updateCurrentMusic(list[0]);
      }
    };

    const finalizeRoom = async () => {
      if (isHost === 'true') {
        const roomId = localStorage.getItem('roomId');
        console.log(`>제가 만든 방(${roomId})을 삭제합니다<`);

        // 1. 다른 게스트들에게 메시지 보낸다
        socket.emit('closeRoom', { playlist_id: roomId });
        // 2. 방을 삭제함
        destroyRoom(roomId);
      } else {
        console.log('>게스트가 방을 나갑니다<');
      }
    };
    initialzeRoom();

    return () => {
      finalizeRoom().then(() => setRoomId(-1));
      // localStorage.removeItem('roomId');
      // localStorage.removeItem('playListId');
      // localStorage.removeItem('isHost');
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid listen-page">
      <div className="row">
        <div className="col-8">
          <Menu />
          <VideoView music={currentMusic} />
        </div>
        <div className="col-4 interaction">
          {isAlong && rId > -1 && <ChatContainer />}
          {!isAlong && (
            <PlayList
              musics={musics}
              updateCurrentMusic={updateCurrentMusic}
              roomId={rId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListenPage);
