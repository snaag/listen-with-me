import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TitleInputBox from './containers/TitleInputBox';
import MusicStackBox from './containers/MusicStackBox';
import SearchMusic from './containers/SearchMusic';
import Modal from 'react-bootstrap/Modal';
import * as api from '../../../api/playList';

class CreateListModal extends Component {
  closeModal() {
    const {
      isModalOpen,
      list_title,
      entries,
      handleEntries,
      handleModalOpen,
      handleMusic,
      handleQuery,
      handleListTitle,
    } = this.props;

    if (list_title || entries.length) {
      if (window.confirm('play list 작성을 취소하시겠습니까')) {
        handleEntries([]);
        handleMusic('');
        handleQuery('');
        handleListTitle('');
        handleModalOpen(!isModalOpen);
      }
    } else {
      handleMusic('');
      handleQuery('');
      handleModalOpen(!isModalOpen);
    }
  }

  async createList() {
    const authorization = localStorage.getItem('authorization') || '';
    const {
      isModalOpen,
      list_title,
      entries,
      handleEntries,
      handleModalOpen,
      handleMusic,
      handleQuery,
      handleListTitle,
      handleMyPlayList,
      handleSignIn,
      history,
    } = this.props;

    if (!list_title) {
      alert('제목을 입력해주세요.');
    } else if (!entries.length) {
      alert('음악을 추가해주세요.');
    } else {
      try {
        const { status } = await api.createPlayList(
          list_title,
          entries,
          authorization
        );
        if (status === 201) {
          alert('play list가 생성 되었습니다.');
          handleEntries([]);
          handleMusic('');
          handleQuery('');
          handleListTitle('');
          handleModalOpen(!isModalOpen);
          history.push('/playlist');
          try {
            const { data } = await api.getPlayList(authorization);
            handleMyPlayList(data);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        alert('로그아웃 되었습니다.');
        handleModalOpen(!isModalOpen);
        handleSignIn(false);
        history.push('/');
        console.log(err);
      }
    }
  }

  render() {
    const { isModalOpen } = this.props;
    return (
      <Modal
        className="createListModal"
        show={isModalOpen}
        onHide={this.closeModal.bind(this)}
      >
        <Modal.Header closeButton className="createListModal_header">
          <Modal.Title className="createListModal_title">
            리스트 만들기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="createListModal_content">
          <TitleInputBox />
          <MusicStackBox />
          <SearchMusic />
          <button
            className="createListModal_content_createListButton"
            onClick={() => this.createList()}
          >
            생성
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(CreateListModal);
