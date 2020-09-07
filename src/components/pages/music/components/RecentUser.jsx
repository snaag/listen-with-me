import React, { Component } from 'react';
import RecentUserEntry from './RecentUserEntry';

let fakeData = [
  {
    id: 4,
    profileImg:
      'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg',
    nickname: 'brbr',
  },
  {
    id: 15,
    profileImg:
      'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg',
    nickname: 'ccccrrrr',
  },
  {
    id: 5,
    profileImg:
      'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg',
    nickname: 'brbr',
  },
  {
    id: 16,
    profileImg:
      'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg',
    nickname: 'ccccrrrr',
  },
];

class RecentUser extends Component {
  state = {
    recentUser: [],
    viewCount: 1,
    buttonDisplay: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  viewListEntry(list) {
    let count = 0;
    return list.map(entry => {
      if (this.state.viewCount > count) {
        count++;
        return <RecentUserEntry key={entry.id} entry={entry} />;
      }
    });
  }

  handleViewButton(list) {
    const { viewCount, buttonDisplay } = this.state;
    const count = list.length;
    this.handleState('viewCount', count === viewCount ? 1 : count);
    this.handleState('buttonDisplay', !buttonDisplay);
  }

  getRecentUser() {
    const recentUser = JSON.parse(localStorage.getItem('recentUser')) || [];
    this.handleState('recentUser', recentUser);
  }

  removeRecentUser() {
    localStorage.removeItem('recentUser');
    this.getRecentUser();
  }

  componentDidMount() {
    // 기록
    // localStorage.setItem('recentUser', JSON.stringify(fakeData));
    // 가져오기
    this.getRecentUser();
  }

  render() {
    const { recentUser, buttonDisplay } = this.state;
    return (
      <div className="recentUser">
        <div className="recentUser_title">최근 따라들은 유저</div>
        <button
          className="recentUser_removeRecentUserButton"
          onClick={() => this.removeRecentUser()}
        >
          기록 삭제
        </button>
        {this.viewListEntry(recentUser)}
        <button
          className="recentUser_viewMoreButton"
          style={{ display: buttonDisplay ? 'none' : 'block' }}
          onClick={() => this.handleViewButton(recentUser)}
        >
          더보기
        </button>
        <button
          className="recentUser_viewLessButton"
          style={{ display: buttonDisplay ? 'block' : 'none' }}
          onClick={() => this.handleViewButton(recentUser)}
        >
          줄이기
        </button>
      </div>
    );
  }
}

export default RecentUser;
