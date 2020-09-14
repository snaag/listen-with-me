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
        console.log(likedList);
        this.props.handleLikedList(likedList);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="renderListMain">
        <div className="renderListMain_content">
          {this.props.likedList.map(listEntry => (
            <RoomListEntry key={listEntry.id} listEntry={listEntry} />
          ))}
        </div>
      </div>
    );
  }
}

export default RoomList;
