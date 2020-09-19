import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as api from '../../../../api/playList';

class MyPlayListEntry extends Component {
  state = {
    title: '',
    buttonDisplay: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  editButton() {
    this.handleState('buttonDisplay', true);
    this.hideEditButton();
  }

  hideEditButton() {
    const { listEntry } = this.props;
    const { title } = this.state;

    let saveTitle = title;
    let root = document.querySelector('#root');
    root.addEventListener('click', e => {
      const { classList, nodeName, className } = e.target;
      if (
        classList[1] !== `number${listEntry.id}` &&
        classList[0] !== 'myPlayList_entry-deleteButton' &&
        classList[3] !== 'times-circle' &&
        nodeName !== 'path' &&
        nodeName !== 'svg' &&
        className !== 'myPlayList_entry-title-inputBox'
      ) {
        this.handleState('buttonDisplay', false);
        this.handleState('title', saveTitle);
      }
    });
  }

  async completeButton(e) {
    const authorization = localStorage.getItem('authorization') || '';
    const { listEntry } = this.props;
    const { title } = this.state;

    if (e.key === 'Enter') {
      try {
        const { status } = await api.editPlayListTitle(
          listEntry.id,
          title,
          authorization
        );

        if (status === 200) {
          this.handleState('title', title);
          this.hideEditButton();
          this.handleState('buttonDisplay', false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async deleteRoom() {
    const authorization = localStorage.getItem('authorization') || '';
    const { listEntry, deleteList } = this.props;

    try {
      const { status } = await api.deletePlayList(listEntry.id, authorization);

      if (status === 204) {
        deleteList(listEntry.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createRoom() {
    const { listEntry, history, handleSignIn } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    if (window.confirm('방을 생성 하시겠습니까?')) {
      try {
        await api.getPlayList(authorization);
        localStorage.setItem('isHost', true);
        localStorage.setItem('playListId', listEntry.id);
        history.push('/listen');
      } catch (err) {
        handleSignIn(false);
        history.push('/');
        console.log(err);
      }
    }
  }

  componentDidMount() {
    const { listEntry } = this.props;

    this.handleState('title', listEntry.title);
  }

  render() {
    const { id, thumbnail, likeAmount, audienceAmount } = this.props.listEntry;

    return (
      <div className="myPlayList_entry">
        {this.state.buttonDisplay && (
          <button
            className="myPlayList_entry-deleteButton"
            onClick={() => this.deleteRoom()}
          >
            <FontAwesomeIcon icon={['far', 'times-circle']} />
          </button>
        )}
        <div className={'myPlayList_entry-thumbnails'}>
          <img
            className={`myPlayList_entry-thumbnails-img number${id}`}
            onClick={() => this.createRoom()}
            src={thumbnail}
            alt=""
          ></img>
        </div>
        <div className="myPlayList_entry-title">
          <div
            className="myPlayList_entry-title-description"
            style={{ display: this.state.buttonDisplay ? 'none' : 'block' }}
            onClick={() => this.createRoom()}
          >
            {this.state.title}
          </div>
          <input
            className="myPlayList_entry-title-inputBox"
            style={{ display: this.state.buttonDisplay ? 'block' : 'none' }}
            onChange={e => this.handleState('title', e.target.value)}
            onKeyPress={e => this.completeButton(e)}
            value={this.state.title}
          ></input>
          <button
            className="myPlayList_entry-title-editButton"
            style={{ display: this.state.buttonDisplay ? 'none' : 'block' }}
            onClick={() => this.editButton()}
          >
            <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
          </button>
          {/* <button
            className="myPlayList_entry-title-completeButton"
            style={{ display: this.state.buttonDisplay ? 'block' : 'none' }}
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

export default withRouter(MyPlayListEntry);
