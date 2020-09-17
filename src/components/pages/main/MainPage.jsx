import React, { Component } from 'react';
import SearchUser from './containers/SearchUser';
import RoomList from './containers/RoomList';
import CreateListModal from '../../modals/CreateListModal/containers/CreateListModal';
import '../../../css/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainPage extends Component {
  render() {
    const { isModalOpen, handleModalOpen } = this.props;

    return (
      <div className="mainPage">
        <SearchUser />
        <RoomList />
        <button
          className="playListPage_modalButton"
          onClick={() => handleModalOpen(!isModalOpen)}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </button>
        {isModalOpen && <CreateListModal />}
      </div>
    );
  }
}

export default MainPage;
