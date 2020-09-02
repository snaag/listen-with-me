import React, { Component } from 'react';
import MyPlayList from './containers/MyPlayList';
import CreateListModal from '../../modals/CreateListModal/containers/CreateListModal';

class PlayListPage extends Component {
  render() {
    const { isModalOpen, handleModalOpen } = this.props;
    return (
      <div>
        <div className="myPlayList">
          <MyPlayList />
        </div>
        <button onClick={() => handleModalOpen(!isModalOpen)}>모달</button>
        <div className="createListModal">
          <CreateListModal />
        </div>
      </div>
    );
  }
}

export default PlayListPage;
