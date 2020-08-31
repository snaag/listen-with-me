import React, { Component } from 'react';

class RoomListEntry extends Component {
  clickListEntry() {
    // 클릭한 리스트의 방이 열려있는지 확인하는 API 추가
    // nickname으로 판별하는 api를 사용 시 클릭한 리스트가 아닐 수 있음
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
