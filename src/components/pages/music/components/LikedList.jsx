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

class LikedList extends Component {
  state = {
    likedList: fakeData,
    viewCount: 4,
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
    this.handleState('viewCount', count === viewCount ? 4 : count);
    this.handleState('buttonDisplay', !buttonDisplay);
  }

  componentDidMount() {
    // fetch('/playlist/likedlist', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // })
    //   .then(res => res.json())
    //   .then(likedList => this.handleState(likedList))
    //   .catch(err => console.log(err));
  }

  render() {
    const { likedList, buttonDisplay } = this.state;
    return (
      <div className="likedList">
        <div className="likedList_title">좋아요한 리스트</div>
        <div
          className="recentAndLikedEntry"
          style={{ height: buttonDisplay ? '25em' : '100%' }}
        >
          {this.viewListEntry(likedList)}
          <button
            className="likedList_viewButton"
            style={{ display: buttonDisplay ? 'none' : 'block' }}
            onClick={() => this.handleViewButton(likedList)}
          >
            더보기
          </button>
          <button
            className="likedList_viewButton"
            style={{ display: buttonDisplay ? 'block' : 'none' }}
            onClick={() => this.handleViewButton(likedList)}
          >
            줄이기
          </button>
        </div>
      </div>
    );
  }
}

export default LikedList;
