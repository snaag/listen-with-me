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
localStorage.setItem('joined', false);

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
  const [listenerAmount, setListenerAmount] = useState();

  // const socketJoin = roomId => {
  //   console.log('socket에 입장 메시지를 보냅니다...>>');
  //   socket.emit('joinRoom', { playlist_id: rId, user_nickname: name });
  // };

  // 문제점: joinRoom 메시지가 너무 많이 전송되었음
  // 해결방법: useEffect 안에 구분자(joined) 를 두어, 이미 방에 참석했는지 여부에 따라 메시지 보내도록 함
  useEffect(() => {
    console.log('socket에 입장 메시지를 보냅니다...>');
    const joined = JSON.parse(localStorage.getItem('joined'));
    if (rId > 0 && !joined) {
      localStorage.setItem('joined', true);
      socket.emit('joinRoom', { playlist_id: rId, user_nickname: name });
    }
  }, [name, rId, socket]);

  // useEffect(() => {
  //   console.log('socket에 입장 메시지를 보냅니다...>');
  //   socket.emit('joinRoom', { playlist_id: rId, user_nickname: name });
  // });

  const getMusics = async playListId => {
    const reducer = (acc, curr) => {
      const id = curr.id;
      acc[id] = curr;
      return acc;
    };

    try {
      console.log('getMusics 시작... playListId:', playListId);

      const { data, status } = await room.getMusics(playListId, authorization);

      console.log('getMusics 성공, data:', data, data.length);
      console.log('가장 첫번째 곡의 id', data[0].id);

      return { list: data.reduce(reducer, {}), fisrtMusicId: data[0].id };
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
      console.log(error);
      return false;
    }
  };

  const addCurrentListener = async playlist_id => {
    try {
      console.log(
        `청취자 수 증가(addCurrentListener) 시작, 보낼 데이터 playlist_id: ${playlist_id}`
      );
      const result = await room.addCurrentListener(playlist_id, authorization);
      console.log('청취자 수 증가(addCurrentListener) 성공: ', result);
    } catch (error) {
      console.log(error);
      console.log('청취자 수 증가(addCurrentListener) 실패');
    }
  };

  const removeCurrentListener = async playlist_id => {
    try {
      console.log('청취자 수 감소(addCurrentListener) 시작');
      const result = await room.removeCurrentListener(
        playlist_id,
        authorization
      );
      console.log('청취자 수 감소(addCurrentListener) 성공: ', result);
    } catch (error) {
      console.log(error);
      console.log('청취자 수 감소(addCurrentListener) 실패');
    }
  };

  const createRoom = async playListId => {
    try {
      console.log('createRoom 시작... playListId:', playListId);
      const { data, status } = await room.createRoom(playListId, authorization);

      if (status === 201) {
        console.log('createRoom 성공, RoomId:', data.id);
        return data.id;
      }
    } catch (error) {
      console.log('createRoom 실패');
      const { response } = error;
      const { status } = response;
      console.log(response);
      if (status === 409) throw error;
    }
  };

  const finalizeRoom = async () => {
    localStorage.setItem('joined', false);

    if (isHost) {
      const roomId = rId;
      console.log(`>제가 만든 방(${roomId})을 삭제합니다<`);

      // 1. 다른 게스트들에게 메시지 보낸다
      socket.emit('closeRoom', { playlist_id: roomId });
      // 2. 방을 삭제함
      destroyRoom(roomId);
    } else {
      console.log('>게스트가 방을 나갑니다<');
      // 청취자 수를 감소시킨다
      const playlist_id = localStorage.getItem('playListId');
      removeCurrentListener(playlist_id, authorization);
    }
    // 정보 초기화
    setRoomId(-1);
    updateCurrentMusicId(-1);
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
        const { data } = await room.getCurrentListener(
          playlist_id,
          authorization
        );
        console.log('getCurrentListener 성공:', data);
        return data.listeners;
      } catch (error) {
        console.log('getCurrentListener 실패:', error);
      }
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
          // localStorage.setItem('roomId', roomId);
          // 2. 방의 음악 정보를 불러온다
          const { list, fisrtMusicId } = await getMusics(playListId);
          console.log(`얻어오는 list입니다: ${list}`);

          updateMusics(list);
          updateCurrentMusicId(fisrtMusicId);
          const result = await getCurrentListener(playListId);
          setListenerAmount(result);
          // socket join
          // socketJoin(roomId);
        } catch (error) {
          console.log('>>>>>', error);
          const { response } = error;
          const { status } = response;
          if (status === 409) {
            const { room_id } = error.response.data;
            console.log(
              `---이미 ${room_id}번으로 열려있는 방입니다. 방을 삭제하려 합니다...---`
            );
            const destroyResult = await destroyRoom(room_id);
            console.log('destroyResult:', destroyResult);
            const roomId = await createRoom(playListId);
            setRoomId(roomId);
            console.log('roomId:', roomId);
            const { list, fisrtMusicId } = await getMusics(playListId);
            console.log('list:', list);
            updateMusics(list);
            updateCurrentMusicId(fisrtMusicId);
            const result = await getCurrentListener(playListId);
            setListenerAmount(result);
            // socket join
            // socketJoin(roomId);
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
        const { list, fisrtMusicId } = await getMusics(playlist_id);
        localStorage.setItem('playListId', playlist_id);

        updateMusics(list);
        const result = await getCurrentListener(playlist_id);
        setListenerAmount(result);
        updateCurrentMusicId(fisrtMusicId);
        // socketJoin(roomId);

        // 2. 청취자 수를 증가시킨다
        addCurrentListener(playlist_id, authorization);
      }
    };

    initialzeRoom();
    return () => {
      // finalizeRoom();
      // localStorage.removeItem('roomId');
      // localStorage.removeItem('playListId');
      // localStorage.removeItem('isHost');
      updateCurrentMusicId(-1);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid listen-page">
      <div className="row">
        <div className="col-8">
          {listenerAmount !== undefined && (
            <Menu
              finalizeRoom={finalizeRoom}
              listenerAmount={listenerAmount}
              playlistId={localStorage.getItem('playListId')}
            />
          )}

          {currentMusicId > -1 && (
            <VideoView
              isAlong={isAlong}
              isHost={isHost}
              currentMusicId={currentMusicId}
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
