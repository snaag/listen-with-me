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
          width="100px"
        />
        <div className="recentAndLikedEntry_content_title">title: {title}</div>
        <div className="recentAndLikedEntry_content_likeAmount">
          likeAmount: {likeAmount}
        </div>
      </div>
    );
  }
}

export default RecentAndLikedEntry;
