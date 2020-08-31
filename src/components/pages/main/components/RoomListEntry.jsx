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
        <img onClick={() => this.clickListEntry()} src={thumbnails} alt="" />
        {title}
        {nickname}
        {likeAmount}
      </div>
    );
  }
}

export default RoomListEntry;
