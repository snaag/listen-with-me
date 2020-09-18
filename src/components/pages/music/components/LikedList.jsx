import React, { Component } from 'react';
import RecentAndLikedEntry from './RecentAndLikedEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as api from '../../../../api/music';

class LikedList extends Component {
  state = {
    likedList: [],
    viewCount: 3,
    buttonDisplay: false,
    isReady: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  viewListEntry(list) {
    const { viewCount, isReady } = this.state;

    let count = 0;
    return list.length ? (
      list.map(entry => {
        if ((list.length <= 4 ? 4 : viewCount) > count) {
          count++;
          return <RecentAndLikedEntry key={entry.id} entry={entry} />;
        }
      })
    ) : !isReady ? (
      <FontAwesomeIcon
        className="musicLikedList_loading"
        icon={['fa', 'spinner']}
        pulse
      />
    ) : (
      '좋아요한 리스트가 없습니다.'
    );
  }

  handleViewButton(list) {
    const { viewCount, buttonDisplay } = this.state;

    const count = list.length;
    this.handleState('viewCount', count === viewCount ? 3 : count);
    this.handleState('buttonDisplay', !buttonDisplay);
  }

  async componentDidMount() {
    const authorization = localStorage.getItem('authorization') || '';

    try {
      const { data } = await api.getLikedList(authorization);
      this.handleState('likedList', data);
      this.handleState('isReady', true);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { likedList, buttonDisplay } = this.state;

    return (
      <div className="likedList">
        <div className="likedList_content">
          <div className="likedList_title">좋아요한 리스트</div>
          <div
            className={
              likedList.length ? 'recentAndLikedEntry' : 'recentAndLikedNotice'
            }
            style={{ height: buttonDisplay ? '32em' : '100%' }}
          >
            {this.viewListEntry(likedList)}
            <div
              className="likedList_viewButton-section"
              style={{
                display: likedList.length <= 4 ? 'none' : 'block',
              }}
            >
              <button
                className="likedList_viewButton"
                onClick={() => this.handleViewButton(likedList)}
                style={{ display: buttonDisplay ? 'none' : 'block' }}
              >
                <FontAwesomeIcon className="viewIcon" icon={['fas', 'plus']} />
              </button>
              <button
                className="likedList_viewButton"
                style={{ display: buttonDisplay ? 'block' : 'none' }}
                onClick={() => this.handleViewButton(likedList)}
              >
                <FontAwesomeIcon className="viewIcon" icon={['fas', 'minus']} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LikedList;
