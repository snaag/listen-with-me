import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../../../api/main';

class SearchUser extends Component {
  handlePressEnter(key) {
    if (key === 'Enter') {
      this.listenAlong();
    }
  }

  appendToRecentList(title, thumbnail, likeAmount) {
    const recentList = JSON.parse(localStorage.getItem('recentList')) || [];
    recentList.push({ thumbnail, title, likeAmount });
    localStorage.setItem('recentList', JSON.stringify(recentList));
  }

  async listenAlong() {
    const {
      isSignIn,
      nickname,
      myNickname,
      handleSignIn,
      history,
    } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    if (isSignIn) {
      if (nickname) {
        if (nickname !== myNickname) {
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
            }
          } catch (err) {
            const { status } = err.response;
            if (status === 404) {
              alert('해당 유저를 찾을 수 없습니다.');
            } else {
              alert('로그아웃 되었습니다.');
              handleSignIn(false);
            }
            console.log(err);
          }
        } else {
          alert('본인 닉네임은 검색이 불가능합니다.');
        }
      } else {
        alert('유저를 입력해 주세요.');
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  }

  async listenRandom() {
    const { isSignIn, handleSignIn, history } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    if (isSignIn) {
      try {
        const { status, data } = await api.listenRandom(authorization);
        console.log('랜덤듣기 데이터...', data);
        const { title, thumbnails, likeAmount } = data;
        this.appendToRecentList(title, thumbnails, likeAmount);
        if (status === 200) {
          localStorage.setItem('isHost', false);
          localStorage.setItem('roomId', data.room_id);
          history.push('/listen');
        }
      } catch (err) {
        const { status } = err.response;
        if (status === 400) {
          alert('열려있는 방이 없습니다.');
        } else {
          alert('로그아웃 되었습니다.');
          handleSignIn(false);
        }
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
