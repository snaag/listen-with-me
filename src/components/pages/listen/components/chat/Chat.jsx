import React, { useState, useEffect, useRef } from 'react';

import '../../../../../css/Chat.css';
// 유저의 아이디로, 어떤 유저가 말 한 것인지에 따라 말풍선 다르게 해주기

const Chat = ({
  // socket,
  name,
  profileURL,
  roomId,
  chats,
  addChat,
  setChat,
  sendChat,
}) => {
  // const playlist_id = localStorage.getItem('roomId');
  // console.log('chat 에 넘어온 roomId: ', roomId);
  // const BASE_URL =
  //   'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';
  // let socket = io.connect(BASE_URL);

  const chatScrollRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight - 300;
  }, [chats]);

  useEffect(() => {
    // setChat([]);
    return () => {
      // 채팅방을 나갔을 때
      // setChat([]);
    };
    // eslint-disable-next-line
  }, []);

  const onTextChange = e => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = e => {
    const playlist_id = roomId;

    e.preventDefault();

    sendChat({
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
        </div>
      </form>
    </div>
  );
};

export default Chat;
