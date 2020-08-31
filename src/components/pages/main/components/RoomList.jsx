import React, { Component } from 'react';
import RoomListEntry from './RoomListEntry';

let fakeData = [
  {
    id: 1,
    thumbnails: 'img1',
    title: 'hello',
    nickname: 'in',
    likeAmount: 10,
  },
  {
    id: 2,
    thumbnails: 'img2',
    title: 'world',
    nickname: 'ho',
    likeAmount: 9,
  },
];

class RoomList extends Component {
  state = {
    likedList: fakeData,
  };

  componentDidMount() {
    // fetch(`/lists?limit=${6}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // })
    //   .then(res => res.json())
    //   .then(likedList => {
    //     this.setState({
    //       likedList: likedList,
    //     });
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="renderListMain_content">
        {this.state.likedList.map(listEntry => (
          <RoomListEntry key={listEntry.id} listEntry={listEntry} />
        ))}
      </div>
    );
  }
}

export default RoomList;
