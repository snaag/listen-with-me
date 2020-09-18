import React, { Component } from 'react';
import RecentAndLikedEntry from './RecentAndLikedEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RecentList extends Component {
  state = {
    recentList: [],
    viewCount: 3,
    buttonDisplay: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  viewListEntry(list) {
    const { viewCount } = this.state;

    let count = 0;
    return list.length
      ? list.map(entry => {
          if ((list.length <= 4 ? 4 : viewCount) > count) {
            count++;
            return <RecentAndLikedEntry key={entry.id} entry={entry} />;
          }
        })
      : '최근 들은 리스트가 없습니다.';
  }

  handleViewButton(list) {
    const { viewCount, buttonDisplay } = this.state;

    const count = list.length;
    this.handleState('viewCount', count === viewCount ? 3 : count);
    this.handleState('buttonDisplay', !buttonDisplay);
  }

  getRecentList() {
    const recentList = JSON.parse(localStorage.getItem('recentList')) || [];
    this.handleState('recentList', recentList);
  }

  removeRecentList() {
    localStorage.removeItem('recentList');
    this.getRecentList();
  }

  componentDidMount() {
    // 기록
    // localStorage.setItem('recentList', JSON.stringify(fakeData));
    // 가져오기
    this.getRecentList();
  }

  render() {
    const { recentList, buttonDisplay } = this.state;

    return (
      <div className="recentList">
        <div className="recentList_content">
          <div className="recentList_title">최근 들은 리스트</div>
          <button
            className="recentList_removeRecentListButton"
            onClick={() => this.removeRecentList()}
          >
            기록 삭제
          </button>
          <div
            className={
              recentList.length ? 'recentAndLikedEntry' : 'recentAndLikedNotice'
            }
            style={{ height: buttonDisplay ? '32em' : '100%' }}
          >
            {this.viewListEntry(recentList)}
            <div
              className="recentList_viewButton-section"
              style={{
                display: recentList.length <= 4 ? 'none' : 'block',
              }}
            >
              <button
                className="recentList_viewButton"
                style={{
                  display: buttonDisplay ? 'none' : 'block',
                }}
                onClick={() => this.handleViewButton(recentList)}
              >
                <FontAwesomeIcon className="viewIcon" icon={['fas', 'plus']} />
              </button>
              <button
                className="recentList_viewButton"
                style={{ display: buttonDisplay ? 'block' : 'none' }}
                onClick={() => this.handleViewButton(recentList)}
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

export default RecentList;
