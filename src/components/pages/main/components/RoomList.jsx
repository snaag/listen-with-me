import React, { Component } from 'react';
import RoomListEntry from '../containers/RoomListEntry';
import * as api from '../../../../api/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RoomList extends Component {
  state = {
    isReady: false,
  };

  handleState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  async getOpenRoom() {
    const { nickname, handleLikedList } = this.props;

    try {
      const { data } = await api.getOpenRoom();
      handleLikedList(data.filter(item => item.nickname !== nickname));
      this.handleState('isReady', true);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getOpenRoom();
    this.intervalOpenRoom = setInterval(this.getOpenRoom.bind(this), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalOpenRoom);
  }

  render() {
    const { isSignIn, likedList } = this.props;
    const { isReady } = this.state;

    return (
      <div className="renderListMain">
        <div
          className={
            likedList.length
              ? 'renderListMain_content'
              : 'renderListMain_notice'
          }
        >
          {likedList.length ? (
            likedList.map(listEntry => (
              <RoomListEntry
                key={listEntry.id}
                isSignIn={isSignIn}
                listEntry={listEntry}
              />
            ))
          ) : !isReady ? (
            <FontAwesomeIcon
              className="isReady_loading"
              icon={['fa', 'spinner']}
              pulse
            />
          ) : (
            '열려있는 방이 없습니다.'
          )}
        </div>
      </div>
    );
  }
}

export default RoomList;
