import React, { Component } from 'react';
import RecentList from './components/RecentList';
import LikedList from './components/LikedList';
import RecentUser from './components/RecentUser';
import '../../../css/Music.css';

class MusicPage extends Component {
  render() {
    return (
      <div className="musicPage">
        <RecentList />
        <LikedList />
        <RecentUser />
      </div>
    );
  }
}

export default MusicPage;
