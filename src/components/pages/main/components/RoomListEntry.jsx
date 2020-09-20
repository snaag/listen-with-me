import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../../../api/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RoomListEntry extends Component {
  appendToRecentList(title, thumbnail, likeAmount) {
    const recentList = JSON.parse(localStorage.getItem('recentList')) || [];
    recentList.push({ thumbnail, title, likeAmount });
    localStorage.setItem('recentList', JSON.stringify(recentList));
  }

  async clickListEntry() {
    const {
      isSignIn,
      listEntry: { room_id, title, thumbnails, likeAmount, nickname },
      history,
      handleSignIn,
      myNickname,
    } = this.props;

    if (isSignIn) {
      const authorization = localStorage.getItem('authorization') || '';
      try {
        await api.maintainSignIn(authorization);
        if (nickname === myNickname) {
          localStorage.setItem('isHost', true);
        } else {
          localStorage.setItem('isHost', false);
          this.appendToRecentList(title, thumbnails, likeAmount);
        }
        localStorage.setItem('roomId', room_id);
        history.push('/listen');
      } catch (err) {
        alert('로그아웃 되었습니다.');
        handleSignIn(false);
        console.log(err);
      }
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  }

  render() {
    const { thumbnails, title, nickname, likeAmount } = this.props.listEntry;

    return (
      <div className="renderListMain_entry">
        <div className="renderListMain_entry-thumbnails">
          <img
            className="renderListMain_entry-thumbnails-img"
            onClick={() => this.clickListEntry()}
            src={thumbnails}
            alt=""
          />
        </div>
        <div className="renderListMain_entry-content">
          <div
            className="renderListMain_entry-title"
            onClick={() => this.clickListEntry()}
          >
            {title}
          </div>
          <div className="renderListMain_entry-liked">
            <FontAwesomeIcon icon={['fas', 'heart']} />
            {' ' + likeAmount}
          </div>
        </div>
        <div className="renderListMain_entry-nickname">{nickname}</div>
      </div>
    );
  }
}

export default withRouter(RoomListEntry);
