import React, { Component } from 'react';
import RoomListEntry from './RoomListEntry';

class RoomList extends Component {
  componentDidMount() {
    fetch(
      `http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )
      .then(res => res.json())
      .then(likedList => {
        this.props.handleLikedList(likedList);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { likedList } = this.props;
    return (
      <div className="renderListMain">
        <div
          className={
            likedList.length
              ? 'renderListMain_content'
              : 'renderListMain_notice'
          }
        >
          {likedList.length
            ? likedList.map(listEntry => (
                <RoomListEntry key={listEntry.id} listEntry={listEntry} />
              ))
            : '열려있는 방이 없습니다.'}
        </div>
      </div>
    );
  }
}

export default RoomList;
