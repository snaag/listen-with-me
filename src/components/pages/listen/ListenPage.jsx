import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Menu from './components/Menu';
import VideoView from './components/VideoView';
import Chat from './components/Chat';

class ListenPage extends Component {
  render() {
    return (
      <>
        <Menu />
        <VideoView />
        <Chat />
      </>
    );
  }
}

export default ListenPage;
