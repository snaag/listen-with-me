import React, { Component } from 'react';
import RecentAndLikedEntry from './RecentAndLikedEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let fakeData = [
  {
    id: 1,
    title: 'hellohellohellohellohellohellohello',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 7,
    likeAmount: 10,
    audienceAmount: 101,
  },
  {
    id: 2,
    title: '헬로헬로헬로헬로헬로헬로헬헬로헬로헬로헬',
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
  {
    id: 5,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
  {
    id: 6,
    title: 'hello',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 7,
    likeAmount: 10,
    audienceAmount: 101,
  },
  {
    id: 7,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
  {
    id: 8,
    title: 'hello',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 7,
    likeAmount: 10,
    audienceAmount: 101,
  },
  {
    id: 9,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
  {
    id: 10,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
  {
    id: 11,
    title: 'world',
    thumbnail:
      'https://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png',
    user_id: 8,
    likeAmount: 9,
    audienceAmount: 231,
  },
  {
    id: 12,
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
    viewCount: 3,
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
      if ((list.length <= 4 ? 4 : this.state.viewCount) > count) {
        count++;
        return <RecentAndLikedEntry key={entry.id} entry={entry} />;
      }
    });
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
    localStorage.setItem('recentList', JSON.stringify(fakeData));
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
            className="recentAndLikedEntry"
            style={{ height: buttonDisplay ? '25em' : '100%' }}
          >
            {this.viewListEntry(recentList)}
            <button
              className="recentList_viewButton"
              style={{
                display:
                  buttonDisplay || recentList.length <= 4 ? 'none' : 'block',
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
    );
  }
}

export default RecentList;
