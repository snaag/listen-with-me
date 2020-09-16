import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
import PlayList from './components/playlist/PlayList';
import '../../../css/Listen.css';

const ListenPage = ({ isAlong, history }) => {
  const { isHost, playListId } = history.location;
  const { roomId, setRoomId } = useState();
  const [musics, setMusics] = useState([]);
  const BASE_URL =
    'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

  const authorization = localStorage.getItem('authorization');
  console.log('HISTORY', history);

  const destroyRoom = async () => {
    try {
      const result = await axios.delete(`${BASE_URL}/room`, {
        headers: {
          authorization,
        },
        params: {
          id: roomId,
        },
      });
      return result;
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fn = async () => {
      try {
        const result = await destroyRoom();
        console.log('>> DELETE ROOM RESULT', result);
      } catch (error) {
        console.log('>>ERROR ', error);
      }
    };
    return () => {
      console.log('>> UNMOUNT <<');
      fn();
    };
    // eslint-disable-next-line
  }, []);

  const createRoom = useCallback(async () => {
    try {
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
        console.log('ROOM CREATE RESULT', data);
        setRoomId(data.id);
      }
    } catch (error) {
      console.log(error.response);
    }
  }, [authorization, playListId, setRoomId]);

  const getMusics = useCallback(async () => {
    const result = await axios.get(`${BASE_URL}/music`, {
      params: {
        id: playListId,
      },
      headers: {
        authorization,
      },
    });
    console.log('RESULT', result);
  }, [authorization, playListId]);

  useEffect(() => {
    getMusics();
    if (isHost) createRoom();
  }, [createRoom, getMusics, isHost]);

  return (
    <div className="container-fluid listen-page">
      <div className="row">
        <div className="col-8">
          <Menu />
          <VideoView />
        </div>
        <div className="col-4 interaction">
          {isAlong && <ChatContainer />}
          {!isAlong && <PlayList />}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListenPage);
