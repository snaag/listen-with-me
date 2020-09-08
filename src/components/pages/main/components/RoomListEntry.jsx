import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RoomListEntry extends Component {
  clickListEntry() {
    // 라우팅 하면서 roomid만 보내면 됨
  }

  render() {
    const { thumbnails, title, nickname, likeAmount } = this.props.listEntry;

    return (
      <div className="renderListMain_entry">
        <img
          className="renderListMain_entry-thumbnails"
          onClick={() => this.clickListEntry()}
          src={thumbnails}
          alt=""
        />
        <div className="renderListMain_entry-title">{title}</div>
        <div className="renderListMain_entry-liked">
          <FontAwesomeIcon icon={['fas', 'heart']} />
          {' ' + likeAmount}
        </div>
        <div className="renderListMain_entry-nickname">{nickname}</div>
      </div>
    );
  }
}

export default RoomListEntry;
