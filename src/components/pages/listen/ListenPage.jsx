import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
import PlayList from './components/playlist/PlayList';
import '../../../css/Listen.css';

const ListenPage = ({
  isAlong,
  currentMusic,
  musics,
  updateCurrentMusic,
  updateMusics,
  history,
}) => {
  const { isHost, playListId } = history.location;
  const [isOpen, setIsOpen] = useState(false);
  localStorage.setItem('playlistId', playListId);
  localStorage.setItem('isHost', isHost); // 노래 변경 시에도 써야해서, 이걸로 해줌
  const BASE_URL =
    'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

  const authorization = localStorage.getItem('authorization');

  const getMusics = async () => {
    try {
      console.log(
        `해당 플레이리스트(${playListId})에 대한 음악들 불러오기 시작`
      );

      const { data, status } = await axios.get(`${BASE_URL}/music`, {
        headers: {
          authorization,
        },
        params: {
          id: playListId,
        },
      });
      if (status === 200) {
        console.log(
          `해당 플레이리스트(${playListId})에 대한 음악들 불러오기 성공`
        );
        // updateMusics([...data]);
        return data;
      }
    } catch (error) {
      console.log(
        `해당 플레이리스트(${playListId})에 대한 음악들 불러오기 실패`
      );
      console.log(error.response);
    }
  };

  const destroyRoom = async () => {
    try {
      const roomId = localStorage.getItem('roomId');
      console.log(`방(${roomId}) 삭제 시작`);
      const result = await axios.delete(`${BASE_URL}/room`, {
        headers: {
          authorization,
        },
        params: {
          id: roomId,
        },
      });

      console.log('방 삭제 중...');
      console.log(result);
      console.log('방 삭제 성공');
      updateMusics([]);
      return true;

      // return result;
    } catch (error) {
      console.log('방 삭제 실패');
      console.log(error.response);
      return false;
    }
  };

  const createRoom = async () => {
    try {
      console.log(`방 생성 시작, playlist id ${playListId}`);
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
        // console.log(`방 생성 완료, roomId: ${data.id}`);
        localStorage.setItem('roomId', data.id);
        // setRoomId(data.id);
        const list = await getMusics();
        updateCurrentMusic(list[0]);
        updateMusics([...list]);
        setIsOpen(true);
        // return data.id;
        return true;
      }
    } catch (error) {
      console.log('방 생성 실패');
      console.log(error.response);
      return false;
    }
  };

  useEffect(() => {
    /*
    const fn = async () => {
      const createResult = await createRoom();
      console.log('>createResult:', createResult);
      if (!createResult) {
        alert('비정상적으로 종료되었었기 때문에, 삭제 후 다시 생성합니다');
        const destroyResult = await destroyRoom();
        console.log('>>destroyResult:', destroyResult);
        // const createResult = await createRoom();
        // console.log('>>createResult:', createResult);
      }
    };

    fn();
    */

    if (isHost) {
      createRoom();
    }
    return () => {
      console.log('CLEAN UP');
      if (isOpen) destroyRoom();
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
          {isAlong && <ChatContainer />}
          {!isAlong && (
            <PlayList musics={musics} updateCurrentMusic={updateCurrentMusic} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListenPage);
