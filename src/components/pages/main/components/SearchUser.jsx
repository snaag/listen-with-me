import React, { Component } from 'react';

class SearchUser extends Component {
  handlePressEnter(key) {
    if (key === 'Enter') {
      this.listenAlong();
    }
  }

  listenAlong() {
    fetch(
      'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/along',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: this.props.nickname,
        }),
        credentials: 'include',
      }
    )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // 상태코드 200이면 룸에 대한 정보를 받고 listen page로 보내 줌
        } else if (res.status === 202) {
          alert('해당 유저가 방을 열지 않았습니다.');
        } else {
          alert('해당 유저를 찾을 수 없습니다.');
        }
      })
      .catch(err => console.log(err));
  }

  listenRandom() {
    const authorization = localStorage.getItem('authorization') || '';
    fetch(
      'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/randomlist',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: authorization,
        },
        credentials: 'include',
      }
    )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // 상태코드 200이면 룸에 대한 정보를 받고 listen page로 보내 줌
        } else {
          alert('열려있는 방이 없습니다.');
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="searchMain">
        <div className="searchMain_content">
          <input
            className="searchMain_input"
            onChange={e => this.props.handleNickname(e.target.value)}
            onKeyPress={e => this.handlePressEnter(e.key)}
            placeholder="검색"
          ></input>
          <button
            className="searchMain_alongButton"
            onClick={() => this.listenAlong()}
          >
            따라듣기
          </button>
          <button
            className="searchMain_RandomButton"
            onClick={() => this.listenRandom()}
          >
            랜덤듣기
          </button>
        </div>
      </div>
    );
  }
}

export default SearchUser;
