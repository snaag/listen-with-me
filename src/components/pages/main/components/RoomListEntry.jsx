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
        <div className="renderListMain_entry-thumbnails">
          <img
            className="renderListMain_entry-thumbnails-content"
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

export default RoomListEntry;
