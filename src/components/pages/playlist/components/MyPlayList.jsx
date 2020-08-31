import React, { Component } from 'react';
import MyPlayListEntry from './MyPlayListEntry';

let fakeData = [
  {
    id: 1,
    title: 'hello',
    thumbnails: 'img1',
    user_id: 1,
    likeAmount: 10,
    audienceAmount: 11,
  },
  {
    id: 2,
    title: 'world',
    thumbnails: 'img2',
    user_id: 1,
    likeAmount: 9,
    audienceAmount: 12,
  },
];

class MyPlayList extends Component {
  state = {
    myPlayList: fakeData,
  };

  handleMyPlayList(list) {
    this.setState({
      myPlayList: list,
    });
  }

  deleteList(id) {
    const newPlayList = this.state.myPlayList.filter(list => {
      console.log(list);
      if (list.id !== id) {
        return list;
      }
    });
    this.handleMyPlayList(newPlayList);
  }

  componentDidMount() {
    fetch('/playlist/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(myPlayList => this.handleMyPlayList(myPlayList))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="myPlayList_content">
        {this.state.myPlayList.map(listEntry => (
          <MyPlayListEntry
            key={listEntry.id}
            listEntry={listEntry}
            deleteList={this.deleteList.bind(this)}
          />
        ))}
      </div>
    );
  }
}

export default MyPlayList;
