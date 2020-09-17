import React, { Component } from 'react';

class RecentUserEntry extends Component {
  render() {
    const { profileImg, nickname } = this.props.entry;

    return (
      <div className="recentUserEntry_section">
        <div className="recentUserEntry_content">
          <img className="recentUserEntry_profileImg" src={profileImg} alt="" />
          <div className="recentUserEntry_nickname">{nickname}</div>
        </div>
      </div>
    );
  }
}

export default RecentUserEntry;
