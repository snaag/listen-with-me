import React, { Component } from 'react';

class RecentAndLikedEntry extends Component {
  render() {
    const { thumbnail, title, likeAmount } = this.props.entry;
    return (
      <div className="recentAndLikedEntry_content">
        <img
          className="recentAndLikedEntry_content_thumbnail"
          src={thumbnail}
          alt=""
        />
        <div className="recentAndLikedEntry_content_title">{title}</div>
        <div className="recentAndLikedEntry_content_likeAmount">
          img {likeAmount}
        </div>
      </div>
    );
  }
}

export default RecentAndLikedEntry;
