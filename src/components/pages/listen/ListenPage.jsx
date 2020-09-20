import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import io from 'socket.io-client';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
import PlayList from './components/playlist/PlayList';
import '../../../css/Listen.css';
import * as room from '../../../api/roomInfo';
import { setChat, addChat } from '../../../modules/chat';

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
  const dispatch = useDispatch();
  const authorization = localStorage.getItem('authorization');
  let socket = io.connect(BASE_URL, { forceNew: true });
  const isHost = JSON.parse(localStorage.getItem('isHost'));
  const [listenerAmount, setListenerAmount] = useState();

  // const socketJoin = roomId => {
  //   console.log('socket에 입장 메시지를 보냅니다...>>');
  //   socket.emit('joinRoom', { playlist_id: rId, user_nickname: name });
  // };

  // 문제점: joinRoom 메시지가 너무 많이 전송되었음
  // 원인: rId가 데이터를 얻어올 때마다 바뀌면서
  // ??: 방을 비정상적으로 종료한 다음이라면 어떻게 되는걸까?
  // 예상1: 뷰를 새로 그리니까 괜찮지않을까??
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

  const sendChat = data => {
    socket.emit('chatMessage', data);
  };

  // ?? 다른 방에 있는 호스트가 방을 닫으면, 상관이 없는 게스트도
  // 메시지를 받는 경우가 있지 않을까??
  const finalizeRoom = async () => {
    dispatch(setChat([]));

    // socket.close(); // log는 찍히지만, 클라이언트의 소켓이 끊어지지는 않는 듯
    // socket.disconnect({ user_nickname: name, playlist_id: rId }); // disconnect message는 나오지만, 데이터는 안가ㅡㄴ듯
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
    socket.emit('leaveRoom', { user_nickname: name, playlist_id: rId });
    socket.disconnect();
    socket.close();
    socket = null;

    // 정보 초기화
    setRoomId(-1);
    updateCurrentMusicId(-1);
  };

  useEffect(() => {
    socket.on('closeRoom', ({ playlist_id }) => {
      console.log(
        `!!![ListenPage] ${playlist_id} 가 닫겼습니다! 더 들으실건가요?`
      );
      if (!isHost) {
        const result = window.confirm(
          '호스트가 방을 종료했습니다. \n듣던 곡 까지 들으시려면 [확인]을, 바로 나가시려면 [취소]를 눌러주세요.'
        ); // true: 확인, false: 취소
        setIsClosed(true);
        setWantToStay(result);
        if (!result) history.push('/playlist');
      }
    });

    socket.on('chatMessage', response => {
      const { playlist_id, user_nickname, message, time } = response;
      console.log('새로운 메시지를 받았습니다!');
      dispatch(addChat({ user_nickname, message, time }));
      // chatScrollRef.current.scrollTop =
      //   chatScrollRef.current.scrollHeight - 300;
    });

    socket.on('changeMusic', ({ playlist_id, music_info }) => {
      console.log('isAlong', isAlong);
      if (!isHost && !isAlong) {
        const { id, title } = music_info;
        console.log(
          `서버로부터 음악이 바뀌었다는 메시지를 받았습니다. 음악의 id는 ${id}, title은 ${title} / playlist_id는: ${playlist_id}`
        );
        updateCurrentMusicId(id);
      }
    });

    // 추가한건데 잘 되나??
    // eslint-disable-next-line
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

    const initializeRoom = async () => {
      dispatch(setChat([]));
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
        // socketJoin(roomId)

        // playlist 정보를 넣어주자
        // localStorage에

        // 2. 청취자 수를 증가시킨다
        addCurrentListener(playlist_id, authorization);
      }
    };

    initializeRoom();
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
          {isAlong && rId > -1 && <ChatContainer sendChat={sendChat} />}
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
