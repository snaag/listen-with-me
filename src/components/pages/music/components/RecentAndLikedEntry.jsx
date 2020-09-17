import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RecentAndLikedEntry extends Component {
  render() {
    const { thumbnail, title, likeAmount } = this.props.entry;

    return (
      <div className="recentAndLikedEntry_content">
        <div className="recentAndLikedEntry_content_thumbnail">
          <img
            className="recentAndLikedEntry_content_thumbnail-img"
            src={thumbnail}
            alt=""
          />
        </div>
        <div className="recentAndLikedEntry_content_section">
          <div className="recentAndLikedEntry_content_title">{title}</div>
          <div className="recentAndLikedEntry_content_likeAmount">
            <FontAwesomeIcon icon={['fas', 'heart']} />
            {' ' + likeAmount}
          </div>
        </div>
      </div>
    );
  }
}

export default RecentAndLikedEntry;
