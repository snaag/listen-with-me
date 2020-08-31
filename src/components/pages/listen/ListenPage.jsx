import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import Chat from './components/chat/Chat';
import PlayList from './components/playlist/PlayList';

const ListenPage = ({ isAlong }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Menu />
          <VideoView />
        </div>
        <div className="col">
          {isAlong && <Chat />}
          {!isAlong && <PlayList />}
        </div>
      </div>
    </div>
  );
};

export default ListenPage;
