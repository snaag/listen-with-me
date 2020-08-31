import React, { Component } from 'react';

class RoomListEntry extends Component {
  clickListEntry() {
    // 라우팅 하면서 roomid만 보내면 됨
  }

  render() {
    const { thumbnails, title, nickname, likeAmount } = this.props.listEntry;

    return (
      <div className="renderListMain_content_entry">
        <img
          className="renderListMain_content_entry-thumbnails"
          onClick={() => this.clickListEntry()}
          src={thumbnails}
          alt=""
        />
        <div className="renderListMain_content_entry-title">
          타이틀: {title}
        </div>
        <div className="renderListMain_content_entry-nickname">
          닉네임: {nickname}
        </div>
        <div className="renderListMain_content_entry-liked">
          좋아요: {likeAmount}
        </div>
      </div>
    );
  }
}

export default RoomListEntry;
