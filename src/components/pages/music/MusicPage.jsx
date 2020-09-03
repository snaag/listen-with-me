import React, { Component } from 'react';
import RecentList from './components/RecentList';
import LikedList from './components/LikedList';
import RecentUser from './components/RecentUser';

class MusicPage extends Component {
  render() {
    return (
      <div>
        <div className="recentList">
          <RecentList />
        </div>
        <div className="LikedList">
          <LikedList />
        </div>
        <div className="RecentUser">
          <RecentUser />
        </div>
      </div>
    );
  }
}

export default MusicPage;
