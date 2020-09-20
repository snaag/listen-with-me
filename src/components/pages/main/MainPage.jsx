import React, { Component } from 'react';
import SearchUser from './containers/SearchUser';
import RoomList from './containers/RoomList';
import CreateListModal from '../../modals/CreateListModal/containers/CreateListModal';
import '../../../css/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MainPage extends Component {
  modalOpen() {
    const { isSignIn, isModalOpen, handleModalOpen } = this.props;

    if (isSignIn) {
      handleModalOpen(!isModalOpen);
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  }

  componentDidMount() {
    localStorage.removeItem('isHost');
  }

  render() {
    const { isModalOpen } = this.props;

    return (
      <div className="mainPage">
        <SearchUser />
        <RoomList />
        <button
          className="playListPage_modalButton"
          onClick={() => this.modalOpen()}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </button>
        {isModalOpen && <CreateListModal />}
      </div>
    );
  }
}

export default MainPage;
