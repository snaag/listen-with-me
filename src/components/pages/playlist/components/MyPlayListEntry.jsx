import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    let title = this.state.title;
    let root = document.querySelector('#root');
    root.addEventListener('click', e => {
      const { classList, nodeName, className } = e.target;
      if (
        classList[1] !== `number${this.props.listEntry.id}` &&
        classList[0] !== 'myPlayList_entry-deleteButton' &&
        classList[3] !== 'times-circle' &&
        nodeName !== 'path' &&
        className !== 'myPlayList_entry-title-inputBox'
      ) {
        this.handleState('buttonDisplay', false);
        this.handleState('title', title);
      }
    });
  }

  completeButton(e) {
    const authorization = localStorage.getItem('authorization') || '';
    const { id, title } = this.props.listEntry;
    if (e.key === 'Enter') {
      fetch(
        `http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist?id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: authorization,
          },
          body: JSON.stringify({
            title: this.state.title,
          }),
          credentials: 'include',
        }
      )
        .then(res => {
          console.log(res);
          if (res.status !== 200) {
            console.log('asdf');
            this.handleState('title', title); // 이게 맞나?? this.state.title 아니고??
          }
          this.handleState('title', this.state.title);
          this.hideEditButton();
          this.handleState('buttonDisplay', false);
        })
        .catch(err => console.log(err));
    }
  }

  deleteRoom() {
    const authorization = localStorage.getItem('authorization') || '';
    const { id } = this.props.listEntry;
    fetch(
      `http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist?id=${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: authorization,
        },
        credentials: 'include',
      }
    )
      .then(res => {
        console.log(res);
        if (res.status === 204) {
          this.props.deleteList(id);
        }
      })
      .catch(err => console.log(err));
  }

  createRoom() {
    // 라우팅 하면서 roomid만 보내면 됨
    const { id } = this.props.listEntry;
    this.props.history.push({
      pathname: '/listen',
      isHost: true,
      playListId: id,
    });
  }

  componentDidMount() {
    this.handleState('title', this.props.listEntry.title);
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
        <img
          className={`myPlayList_entry-thumbnails number${id}`}
          onClick={() => this.createRoom()}
          src={thumbnail}
          alt=""
        ></img>
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
