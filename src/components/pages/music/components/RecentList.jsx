import React, { Component } from 'react';
import RecentAndLikedEntry from './RecentAndLikedEntry';

let fakeData = [
  {
    id: 1,
    title: 'hello',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 7,
    likeAmount: 10,
    audienceAmount: 101,
  },
  {
    id: 2,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
  {
    id: 3,
    title: 'hello',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 7,
    likeAmount: 10,
    audienceAmount: 101,
  },
  {
    id: 4,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
];

class RecentList extends Component {
  state = {
    recentList: [],
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
        return <RecentAndLikedEntry key={entry.id} entry={entry} />;
      }
    });
  }

  handleViewButton(list) {
    const { viewCount, buttonDisplay } = this.state;
    const count = list.length;
    this.handleState('viewCount', count === viewCount ? 1 : count);
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
      <div className="recentList_content">
        <div className="recentList_content_title">최근 들은 리스트</div>
        <button
          className="recentList_content_removeRecentListButton"
          onClick={() => this.removeRecentList()}
        >
          기록 삭제
        </button>
        {this.viewListEntry(recentList)}
        <button
          className="recentList_content_viewMoreButton"
          style={{ display: buttonDisplay ? 'none' : 'block' }}
          onClick={() => this.handleViewButton(recentList)}
        >
          더보기
        </button>
        <button
          className="recentList_content_viewLessButton"
          style={{ display: buttonDisplay ? 'block' : 'none' }}
          onClick={() => this.handleViewButton(recentList)}
        >
          줄이기
        </button>
      </div>
    );
  }
}

export default RecentList;
