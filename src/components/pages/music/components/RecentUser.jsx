import React, { Component } from 'react';
import RecentUserEntry from './RecentUserEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RecentUser extends Component {
  state = {
    recentUser: [],
    viewCount: 7,
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
            return <RecentUserEntry key={entry.id} entry={entry} />;
          }
        })
      : '최근 따라들은 유저가 없습니다.';
  }

  handleViewButton(list) {
    const { viewCount, buttonDisplay } = this.state;

    const count = list.length;
    this.handleState('viewCount', count === viewCount ? 7 : count);
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
        <div className="recentUser_content">
          <div className="recentUser_title">최근 따라들은 유저</div>
          <button
            className="recentUser_removeRecentUserButton"
            onClick={() => this.removeRecentUser()}
          >
            기록 삭제
          </button>
          <div
            className={
              recentUser.length ? 'recentUserEntry' : 'recentUserNotice'
            }
            style={{ height: buttonDisplay ? '22em' : '100%' }}
          >
            {this.viewListEntry(recentUser)}
            <div
              className="recentUser_viewButton_section"
              style={{
                display: recentUser.length <= 8 ? 'none' : 'block',
              }}
            >
              <button
                className="recentUser_viewButton"
                style={{
                  display: buttonDisplay ? 'none' : 'block',
                }}
                onClick={() => this.handleViewButton(recentUser)}
              >
                <FontAwesomeIcon
                  className="userViewIcon"
                  icon={['fas', 'plus']}
                />
              </button>
              <button
                className="recentUser_viewButton"
                style={{ display: buttonDisplay ? 'block' : 'none' }}
                onClick={() => this.handleViewButton(recentUser)}
              >
                <FontAwesomeIcon
                  className="userViewIcon"
                  icon={['fas', 'minus']}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentUser;
