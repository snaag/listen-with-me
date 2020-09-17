import React, { Component } from 'react';
import RecentAndLikedEntry from './RecentAndLikedEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  {
    id: 5,
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
      : '좋아요한 리스트가 없습니다.';
  }

  handleViewButton(list) {
    const { viewCount, buttonDisplay } = this.state;

    const count = list.length;
    this.handleState('viewCount', count === viewCount ? 3 : count);
    this.handleState('buttonDisplay', !buttonDisplay);
  }

  componentDidMount() {
    const authorization = localStorage.getItem('authorization') || '';

    fetch(
      'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist/likedlist',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: authorization,
        },
        credentials: 'include',
      }
    )
      .then(res => res.json())
      .then(likedList => this.handleState('likedList', likedList))
      .catch(err => console.log(err));
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
