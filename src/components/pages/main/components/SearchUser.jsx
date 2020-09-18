import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../../../api/main';

class SearchUser extends Component {
  handlePressEnter(key) {
    if (key === 'Enter') {
      this.listenAlong();
    }
  }

  async listenAlong() {
    const { isSignIn, nickname, history } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    if (isSignIn) {
      if (nickname) {
        try {
          const { status, data } = await api.listenAlong(
            nickname,
            authorization
          );

          if (status === 200) {
            localStorage.setItem('isHost', false);
            localStorage.setItem('roomId', data.id);
            history.push('/listen');
          } else if (status === 202) {
            alert('해당 유저가 방을 열지 않았습니다.');
          } else {
            alert('해당 유저를 찾을 수 없습니다.');
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        alert('유저를 입력해 주세요.');
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  }

  async listenRandom() {
    const { isSignIn, history } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    if (isSignIn) {
      try {
        const { status, data } = await api.listenRandom(authorization);

        if (status === 200) {
          localStorage.setItem('isHost', false);
          localStorage.setItem('roomId', data.room_id);
          history.push('/listen');
        } else {
          alert('열려있는 방이 없습니다.');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  }

  render() {
    const { handleNickname } = this.props;

    return (
      <div className="searchMain">
        <input
          className="searchMain_input"
          onChange={e => handleNickname(e.target.value)}
          onKeyPress={e => this.handlePressEnter(e.key)}
          placeholder="검색"
        ></input>
        <button
          className="searchMain_alongButton"
          onClick={() => this.listenAlong()}
        >
          따라듣기
        </button>
        <button
          className="searchMain_RandomButton"
          onClick={() => this.listenRandom()}
        >
          랜덤듣기
        </button>
      </div>
    );
  }
}

export default withRouter(SearchUser);
