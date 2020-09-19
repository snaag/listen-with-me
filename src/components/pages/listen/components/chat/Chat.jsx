import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import '../../../../../css/Chat.css';
// 유저의 아이디로, 어떤 유저가 말 한 것인지에 따라 말풍선 다르게 해주기

const Chat = ({ name, profileURL, roomId, chats, addChat, setChat }) => {
  // const playlist_id = localStorage.getItem('roomId');
  console.log('chat 에 넘어온 roomId: ', roomId);
  const BASE_URL =
    'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';
  let socket = io.connect(BASE_URL);

  const chatScrollRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // const playlist_id = localStorage.getItem('roomId');
    const playlist_id = roomId;
    console.log(`방에 입장 시 roomId: ${roomId}`);

    socket.emit('joinRoom', { playlist_id, user_nickname: name });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log('roomId가 업데이트 되었습니다', roomId);
  // }, [roomId]);

  useEffect(() => {
    // 메시지를 받아서 화면에 띄워주는 부분

    socket.on(
      'chatMessage',
      ({ playlist_id, user_nickname, message, time }) => {
        addChat({ user_nickname, message, time });
      }
    );

    socket.on('closeRoom', ({ playlist_id }) => {
      console.log(
        `!!![Chat.jsx] ${playlist_id} 가 닫겼습니다! 더 들으실건가요?`
      );
      // yes or no alert 띄우기
    });

    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight - 300;
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

  const ChatFromOther = ({ user_nickname, message, time }) => (
    <div className="chat__content chat__other">
      <h1 className="chat__sender">{user_nickname}</h1>
      <div className="chat__text">
        <div className="chat__message">{message}</div>
        <span className="chat__time">{time}</span>
      </div>
    </div>
  );

  const ChatFromMe = ({ user_nickname, message, time }) => (
    <div className="chat__content chat__me">
      <h1 className="chat__sender">{user_nickname}</h1>
      <div className="chat__text">
        <span className="chat__message">{message}</span>
        <div className="chat__time">{time}</div>
      </div>
    </div>
  );

  const ChatFromBot = ({ message }) => (
    <div className="chat__content chat__bot">
      <span className="chat__message">{message}</span>
    </div>
  );

  const renderChat = () =>
    chats.map(({ user_nickname, message, time }, index) =>
      user_nickname === 'Bot' ? (
        <ChatFromBot message={message} />
      ) : user_nickname === name ? (
        <ChatFromMe
          key={index}
          user_nickname={user_nickname}
          message={message}
          time={time}
        />
      ) : (
        <ChatFromOther
          key={index}
          user_nickname={user_nickname}
          message={message}
          time={time}
        />
      )
    );

  return (
    <div className="chat">
      <div className="chat__list" ref={chatScrollRef}>
        {renderChat()}
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
