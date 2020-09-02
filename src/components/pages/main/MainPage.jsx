import React, { Component } from 'react';
import SearchUser from './containers/SearchUser';
import RoomList from './containers/RoomList';

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
