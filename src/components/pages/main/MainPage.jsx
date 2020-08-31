import React, { Component } from 'react';
import SearchUser from './components/SearchUser';
import RoomList from './components/RoomList';

class MainPage extends Component {
  render() {
    return (
      <div>
        <div className="searchMain">
          <SearchUser />
        </div>
        <div className="renderListMain">
          <RoomList />
        </div>
      </div>
    );
  }
}

export default MainPage;
