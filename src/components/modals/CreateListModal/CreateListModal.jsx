import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TitleInputBox from './containers/TitleInputBox';
import MusicStackBox from './containers/MusicStackBox';
import SearchMusic from './containers/SearchMusic';
import Modal from 'react-bootstrap/Modal';

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

  createList() {
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
    } = this.props;
    if (!list_title) {
      alert('제목을 입력해주세요.');
    } else if (!entries.length) {
      alert('음악을 추가해주세요.');
    } else {
      fetch(
        'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: authorization,
          },
          body: JSON.stringify({
            list_title: list_title,
            entries: entries,
          }),
          credentials: 'include',
        }
      )
        .then(res => {
          if (res.status === 201) {
            alert('play list가 생성 되었습니다.');
            handleEntries([]);
            handleMusic('');
            handleQuery('');
            handleListTitle('');
            handleModalOpen(!isModalOpen);
            // api요청
            fetch(
              'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist/user',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: authorization,
                },
                credentials: 'include',
              }
            )
              .then(res => res.json())
              .then(myPlayList => handleMyPlayList(myPlayList))
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
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
