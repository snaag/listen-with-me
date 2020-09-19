import React, { Component } from 'react';
import MyPlayListEntry from '../containers/MyPlayListEntry';
import * as api from '../../../../api/playList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyPlayList extends Component {
  state = {
    isReady: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  deleteList(id) {
    const { myPlayList, handleMyPlayList } = this.props;

    const newPlayList = myPlayList.filter(list => {
      if (list.id !== id) {
        return list;
      }
    });
    handleMyPlayList(newPlayList);
  }

  async componentDidMount() {
    const { handleMyPlayList } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    try {
      const { data } = await api.getPlayList(authorization);
      handleMyPlayList(data);
      this.handleState('isReady', true);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { myPlayList } = this.props;
    const { isReady } = this.state;

    return (
      <div className="myPlayList">
        <div
          className={
            myPlayList.length ? 'myPlayList_content' : 'myPlayList_notice'
          }
        >
          {myPlayList.length ? (
            myPlayList.map(listEntry => (
              <MyPlayListEntry
                key={listEntry.id}
                listEntry={listEntry}
                deleteList={this.deleteList.bind(this)}
              />
            ))
          ) : !isReady ? (
            <FontAwesomeIcon
              className="isReady_loading"
              icon={['fa', 'spinner']}
              pulse
            />
          ) : (
            '작성한 플레이 리스트가 없습니다.'
          )}
        </div>
      </div>
    );
  }
}

export default MyPlayList;
