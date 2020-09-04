import React, { Component } from 'react';
import SearchUser from './containers/SearchUser';
import RoomList from './containers/RoomList';
import '../../../css/Main.css';

class MainPage extends Component {
  render() {
    return (
      <div className="mainPage">
        <SearchUser />
        <RoomList />
      </div>
    );
  }
}

export default MainPage;
