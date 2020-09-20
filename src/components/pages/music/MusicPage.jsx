import React, { Component } from 'react';
import RecentList from './components/RecentList';
import LikedList from './components/LikedList';
// import RecentUser from './components/RecentUser';
import CreateListModal from '../../modals/CreateListModal/containers/CreateListModal';
import '../../../css/Music.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicPage extends Component {
  render() {
    const { isModalOpen, handleModalOpen } = this.props;

    return (
      <div className="musicPage">
        <RecentList />
        <LikedList />
        {/* <RecentUser /> */}
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

export default MusicPage;
