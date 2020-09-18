import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import '../../../../../css/Chat.css';
// 유저의 아이디로, 어떤 유저가 말 한 것인지에 따라 말풍선 다르게 해주기

const Chat = ({ name, profileURL, roomId, chats, addChat, setChat }) => {
  // const playlist_id = localStorage.getItem('roomId');
  const BASE_URL =
    'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';
  let socket = io.connect(BASE_URL);

  const [message, setMessage] = useState('');

  useEffect(() => {
    // const playlist_id = localStorage.getItem('roomId');
    const playlist_id = roomId;
    socket.emit('joinRoom', { playlist_id, user_nickname: name });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // 메시지를 받아서 화면에 띄워주는 부분
    // const playlist_id = localStorage.getItem('roomId');
    // const playlist_id = roomId;
    console.log('메시지를 받았습니다!');

    socket.on(
      'chatMessage',
      ({ playlist_id, user_nickname, message, time }) => {
        addChat({ user_nickname, message, time });
      }
    );
  });

  useEffect(() => {
    //
    console.log('>>', chats);
  }, [chats]);

  useEffect(() => {
    return () => {
      // 채팅방을 나갔을 때
      // [LIFECYCLE] component will unmount
      // const playlist_id = localStorage.getItem('roomId');
      const playlist_id = roomId;

      setChat([]);
      socket.emit('disconnectChat', { user_nickname: name, playlist_id });
      socket.close();

      // socket.disconnect({ user_nickname: name, playlist_id });
    };
    // eslint-disable-next-line
  }, []);

  const onTextChange = e => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = e => {
    // const playlist_id = localStorage.getItem('roomId');
    const playlist_id = roomId;
    console.log('메시지 전송', {
      user_nickname: name,
      message,
      playlist_id,
    });

    e.preventDefault();
    console.log('메시지를 보낼 때');

    socket.emit('chatMessage', {
      user_nickname: name,
      message,
      playlist_id,
    });

    setMessage('');
  };

  const renderChat = () =>
    chats.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));

  return (
    <div className="chat">
      {/* <div className="render-chat">{renderChat()}</div> */}
      <div className="chat__list">
        <ul>
          {chats.map(chat => (
            <li>{`${chat.user_nickname}: ${chat.message}`}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={onMessageSubmit}>
        <div className="chat__inner">
          <input
            className="chat__input"
            type="text"
            name="message"
            value={message}
            onChange={onTextChange}
          />
          <button className="chat__send-button">전송</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
