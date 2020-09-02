import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
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
          {isAlong && <ChatContainer />}
          {!isAlong && <PlayList />}
        </div>
      </div>
    </div>
  );
};

export default ListenPage;
