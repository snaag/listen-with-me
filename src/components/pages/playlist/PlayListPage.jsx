import React, { Component } from 'react';
import MyPlayList from './containers/MyPlayList';
import CreateListModal from '../../modals/CreateListModal/containers/CreateListModal';
import '../../../css/PlayList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PlayListPage extends Component {
  render() {
    const { isModalOpen, handleModalOpen } = this.props;

    return (
      <div className="playListPage">
        <div className="playListPage_title">내 플레이 리스트</div>
        <MyPlayList />
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

export default PlayListPage;
