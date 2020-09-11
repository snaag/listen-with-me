import React, { Component } from 'react';
import RoomListEntry from './RoomListEntry';

class RoomList extends Component {
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
    //     this.props.handleLikedList(likedList);
    //   })
    //   .catch(err => console.log(err));
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
