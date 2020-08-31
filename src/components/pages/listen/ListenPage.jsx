import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import Chat from './components/Chat';

class ListenPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Menu />
            <VideoView />
          </div>
          <div className="col">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

export default ListenPage;
