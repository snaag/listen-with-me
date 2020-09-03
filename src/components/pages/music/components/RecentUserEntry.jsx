import React, { Component } from 'react';

class RecentUserEntry extends Component {
  render() {
    const { profileImg, nickname } = this.props.entry;
    return (
      <div className="recentUserEntry_content">
        <img
          className="recentUserEntry_content_profileImg"
          src={profileImg}
          alt=""
          width="100px"
        />
        <div className="recentUserEntry_content_nickname">
          nickname: {nickname}
        </div>
      </div>
    );
  }
}

export default RecentUserEntry;
