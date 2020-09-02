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
    // fetch('/playlist/user', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // })
    //   .then(res => res.json())
    //   .then(myPlayList => this.props.handleMyPlayList(myPlayList))
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="myPlayList_content">
        {this.props.myPlayList.map(listEntry => (
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
