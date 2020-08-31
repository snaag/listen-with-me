import React, { Component } from 'react';
import MyPlayList from './components/MyPlayList';

class PlayListPage extends Component {
  render() {
    return (
      <div className="myPlayList">
        <MyPlayList />
      </div>
    );
  }
}

export default PlayListPage;
