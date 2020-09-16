import React from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import ChatContainer from './containers/ChatContainer';
import PlayList from './components/playlist/PlayList';
import '../../../css/Listen.css';

const ListenPage = ({ isAlong, history }) => {
  console.log(history);
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
