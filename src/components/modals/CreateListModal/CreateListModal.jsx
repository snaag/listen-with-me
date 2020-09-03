import React, { Component } from 'react';
import TitleInputBox from './containers/TitleInputBox';
import MusicStackBox from './containers/MusicStackBox';
import SearchMusic from './containers/SearchMusic';
import './CreateListModal.css';

class CreateListModal extends Component {
  closeModal() {
    const {
      isModalOpen,
      list_title,
      entries,
      handleEntries,
      handleModalOpen,
    } = this.props;

    if (list_title || entries.length) {
      if (window.confirm('play list 작성을 취소하시겠습니까')) {
        handleEntries([]);
        handleModalOpen(!isModalOpen);
      }
    } else {
      handleModalOpen(!isModalOpen);
    }
  }

  createList() {
    // const {
    //   isModalOpen,
    //   list_title,
    //   entries,
    //   handleEntries,
    //   handleModalOpen,
    // } = this.props;
    // if (!list_title) {
    //   alert('제목을 입력해주세요.');
    // } else if (!entries.length) {
    //   alert('음악을 추가해주세요.');
    // } else {
    // fetch('/playlist', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     list_title: list_title,
    //     entries: entries,
    //   }),
    //   credentials: 'include',
    // })
    //   .then(res => {
    //     if (res.status === 202) {
    //       alert('play list가 생성 되었습니다.');
    //       handleEntries([]);
    //       handleModalOpen(!isModalOpen);
    //     }
    //   })
    //   .catch(err => console.log(err));
    // }
  }

  render() {
    const { isModalOpen } = this.props;
    return (
      <React.Fragment>
        {isModalOpen ? (
          <React.Fragment>
            <div
              className="createListModal_overlay"
              onClick={() => this.closeModal()}
            />
            <div className="createListModal_content">
              <div className="createListModal_content_titleInputBox">
                <TitleInputBox />
              </div>
              <div className="createListModal_content_musicStackBox">
                <MusicStackBox />
              </div>
              <div className="createListModal_content_searchMusic">
                <SearchMusic />
              </div>
              <button
                className="createListModal_content_createListButton"
                onClick={() => this.createList()}
              >
                확인
              </button>
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default CreateListModal;
