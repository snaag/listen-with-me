import React, { Component } from 'react';
import MyPlayListEntry from './MyPlayListEntry';

class MyPlayList extends Component {
  deleteList(id) {
    const newPlayList = this.props.myPlayList.filter(list => {
      if (list.id !== id) {
        return list;
      }
    });
    this.props.handleMyPlayList(newPlayList);
  }

  componentDidMount() {
    const authorization = localStorage.getItem('authorization') || '';
    fetch(
      'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/playlist/user',
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
      .then(myPlayList => this.props.handleMyPlayList(myPlayList))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props.myPlayList);
    return (
      <div className="myPlayList">
        <div className="myPlayList_content">
          {this.props.myPlayList.map(listEntry => (
            <MyPlayListEntry
              key={listEntry.id}
              listEntry={listEntry}
              deleteList={this.deleteList.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MyPlayList;
