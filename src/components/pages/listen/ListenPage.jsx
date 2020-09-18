import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import io from 'socket.io-client';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
import PlayList from './components/playlist/PlayList';
import '../../../css/Listen.css';
import * as room from '../../../api/roomInfo';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

const ListenPage = ({
  name,
  isAlong,
  rId,
  isClosed,
  wantToStay,
  currentMusicId,
  musics,
  updateMusics,
  setRoomId,
  setIsClosed,
  setWantToStay,
  playNextMusic,
  updateCurrentMusicId,
  history,
}) => {
  const authorization = localStorage.getItem('authorization');
  let socket = io.connect(BASE_URL);
  const isHost = JSON.parse(localStorage.getItem('isHost'));
  const [audienceAmount, setAudienceAmount] = useState();

  const getMusics = async playListId => {
    try {
      console.log('getMusics 시작... playListId:', playListId);

      const { data, status } = await room.getMusics(playListId, authorization);
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
      const { data, status } = await room.getRoomStatus(roomId, authorization);

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
      console.log('destroyRoom 시작... roomId:', roomId);
      const result = await room.destroyRoom(roomId, authorization);

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
      const { data, status } = await room.createRoom(playListId, authorization);

      if (status === 201) {
        console.log('createRoom 성공');
        return data.id;
      } else {
        console.log(status, data);
        console.log('createRoom 실패');
      }
    } catch (error) {
      console.log('createRoom 실패');
      const { response } = error;
      const { status } = response;
      if (status === 409) throw error;
    }
  };

  useEffect(() => {
    socket.on('closeRoom', ({ playlist_id }) => {
      console.log(
        `!!![ListenPage] ${playlist_id} 가 닫겼습니다! 더 들으실건가요?`
      );
      const result = window.confirm(
        '호스트가 방을 종료했습니다. \n듣던 곡 까지 들으시려면 [확인]을, 바로 나가시려면 [취소]를 눌러주세요.'
      ); // true: 확인, false: 취소
      setIsClosed(true);
      setWantToStay(result);

      if (!result) history.push('/playlist');
    });
  });

  useEffect(() => {
    const getCurrentListener = async playlist_id => {
      console.log('getCurrentListener 시작');
      try {
        const result = await room.getCurrentListener(
          playlist_id,
          authorization
        );
        console.log('getCurrentListener 성공:', result);
      } catch (error) {
        console.log('getCurrentListener 실패:', error);
      }
    };

    const reducer = (acc, curr) => {
      const id = curr.id;
      acc[id] = curr;
      return acc;
    };

    const initialzeRoom = async () => {
      if (isHost) {
        console.log('>제가 만든 방 입니다<');

        const playListId = localStorage.getItem('playListId');

        try {
          // 내가 방을 연 호스트인 경우,
          // 1. 방을 생성한다
          const roomId = await createRoom(playListId); // 이미 열려있던 방일 경우, 여기서 에러 발생해서 아래의 catch로 감
          console.log(`방이 생성되었고, 방의 id는 ${roomId} 입니다`);
          setRoomId(roomId);
          localStorage.setItem('roomId', roomId);
          // 2. 방의 음악 정보를 불러온다
          const list = await getMusics(playListId);

          updateMusics(list.reduce(reducer, {}));
          getCurrentListener(playListId);
          updateCurrentMusicId(list[0].id);
        } catch (error) {
          console.log('방 생성 중 문제가 발생했습니다');
          console.log(error.response);
          const { status } = error.response;
          if (status === 409) {
            console.log('이미 중복된 방입니다. 방을 삭제하려 합니다...');
            // confilict시 방 id 받아오기
            // 그리고 받아온 방 아이디로, 그 방 삭제하기
            // >>ERR
            alert('문제가 발생했습니다. 다시 시도해주세요.');
            history.push('/playlist');
          }
        }
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

        /*
        const result = await room.getCurrentListener(
          playlist_id,
          authorization
        );
        console.log('getCurrentListener:', result);
        */
        // >>ERR pending

        updateMusics(list.reduce(reducer, {}));
        getCurrentListener(playlist_id);
        updateCurrentMusicId(list[0].id);
      }
    };

    const finalizeRoom = async () => {
      if (isHost) {
        const roomId = localStorage.getItem('roomId');
        console.log(`>제가 만든 방(${roomId})을 삭제합니다<`);

        // 1. 다른 게스트들에게 메시지 보낸다
        socket.emit('closeRoom', { playlist_id: roomId });
        // 2. 방을 삭제함
        destroyRoom(roomId);
      } else {
        console.log('>게스트가 방을 나갑니다<');
      }
      // 정보 초기화
      setRoomId(-1);
      updateCurrentMusicId(-1);
    };
    initialzeRoom();
    const roomId = localStorage.getItem('roomId');
    socket.emit('joinRoom', { playlist_id: roomId, user_nickname: name });

    return () => {
      finalizeRoom();
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
          <Menu audienceAmount={audienceAmount} />
          {currentMusicId > -1 && (
            <VideoView
              isAlong={isAlong}
              isHost={isHost}
              music={musics[currentMusicId]}
              playNextMusic={playNextMusic}
              roomId={rId}
            />
          )}
        </div>
        <div className="col-4 interaction">
          {isAlong && rId > -1 && <ChatContainer />}
          {!isAlong && (
            <PlayList
              musics={musics}
              updateCurrentMusicId={updateCurrentMusicId}
              roomId={rId}
              isAlong={isAlong}
              isHost={isHost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListenPage);
