import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyPlayListEntry extends Component {
  state = {
    title: '',
    inputTitleDisplay: false,
    deleteButtonDisplay: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  editTitleButton() {
    this.handleState('inputTitleDisplay', true);
  }

  hideDeleteButton() {
    let root = document.querySelector('#root');
    root.addEventListener('click', e => {
      const { classList, nodeName } = e.target;
      if (
        classList[1] !== `number${this.props.listEntry.id}` &&
        classList[0] !== 'myPlayList_entry-deleteButton' &&
        classList[3] !== 'times-circle' &&
        nodeName !== 'path'
      ) {
        this.handleState('deleteButtonDisplay', false);
      }
    });
  }

  handleButtonPress() {
    this.buttonPressTimer = setTimeout(() => {
      this.handleState('deleteButtonDisplay', true);
      this.hideDeleteButton();
    }, 1000);
  }

  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  completeButton(e) {
    // if (e.key === 'Enter') {
    // 테스트
    // this.handleState('title', this.state.title);
    // this.handleState('inputTitleDisplay', false);
    // fetch(`/playlist?id=${this.props.listEntry.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: this.state.title,
    //   }),
    //   credentials: 'include',
    // })
    //   .then(res => {
    //     if (res.status !== 200) {
    //       this.handleState('title', this.props.listEntry.title);
    //     }
    //     this.handleState('inputTitleDisplay', false);
    //   })
    //   .catch(err => console.log(err));
    // }
  }

  deleteRoom() {
    // const { id } = this.props.listEntry;
    // fetch(`/playlist?id=${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // })
    //   .then(res => {
    //     if (res.status === 204) {
    //       this.props.deleteList(id);
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  createRoom() {
    // 라우팅 하면서 roomid만 보내면 됨
  }

  componentDidMount() {
    this.handleState('title', this.props.listEntry.title);
  }

  render() {
    const { id, thumbnails, likeAmount, audienceAmount } = this.props.listEntry;

    return (
      <div className="myPlayList_entry">
        {this.state.deleteButtonDisplay && (
          <button
            className="myPlayList_entry-deleteButton"
            onClick={() => this.deleteRoom()}
          >
            <FontAwesomeIcon
              className="times-circle"
              icon={['far', 'times-circle']}
            />
          </button>
        )}
        <img
          className={`myPlayList_entry-thumbnails number${id}`}
          onClick={() => this.createRoom()}
          onMouseDown={this.handleButtonPress.bind(this)}
          onMouseUp={this.handleButtonRelease.bind(this)}
          src={thumbnails}
          alt=""
        ></img>
        <div className="myPlayList_entry-title">
          <div
            className="myPlayList_entry-title-description"
            style={{ display: this.state.inputTitleDisplay ? 'none' : 'block' }}
          >
            {this.state.title}
          </div>
          <input
            className="myPlayList_entry-title-inputBox"
            style={{ display: this.state.inputTitleDisplay ? 'block' : 'none' }}
            onChange={e => this.handleState('title', e.target.value)}
            onKeyPress={e => this.completeButton(e)}
            value={this.state.title}
          ></input>
          <button
            className="myPlayList_entry-title-editButton"
            style={{ display: this.state.inputTitleDisplay ? 'none' : 'block' }}
            onClick={() => this.editTitleButton()}
          >
            <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
          </button>
          {/* <button
            className="myPlayList_entry-title-completeButton"
            style={{ display: this.state.inputTitleDisplay ? 'block' : 'none' }}
            onClick={() => this.completeButton()}
          >
            완료
          </button> */}
        </div>
        <div className="myPlayList_entry-liked">
          <FontAwesomeIcon icon={['fas', 'heart']} />
          {' ' + likeAmount}
        </div>
        <div className="myPlayList_entry-audience">
          <FontAwesomeIcon icon={['fas', 'users']} />
          {' ' + audienceAmount}
        </div>
      </div>
    );
  }
}

export default MyPlayListEntry;
