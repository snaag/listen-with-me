import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// 유저의 아이디로, 어떤 유저가 말 한 것인지에 따라 말풍선 다르게 해주기

const Chat = ({ name, profileURL, chats, addChat }) => {
  const playlist_id = 0; // 나중에 API로 받아올 예정!
  const BASE_URL =
    'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';
  let socket = io.connect(BASE_URL);

  // const [chatInfo, setChatInfo] = useState({ message: '', name });
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('방에 들어왔을 때');
    socket.emit('chatMessage', {
      user_nickname: name,
      message,
      playlist_id,
    });
    socket.emit('joinRoom', { playlist_id, user_nickname: name });
    // addCurrentListener 요청 (playlist_id 보내주기)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // 메시지를 받아서 화면에 띄워주는 부분
    console.log('setChats를 업데이트 해줄 때 (메시지들을 불러올 때)');
    socket.on('chatMessage', ({ user_nickname, message, time }) => {
      addChat({ user_nickname, message });
    });
  });

  useEffect(() => {
    //
    console.log('화면에 띄울 메시지들: ');
    console.log('>>', chats);
  }, [chats]);

  useEffect(() => {
    return () => {
      // 채팅방을 나갔을 때
      // [LIFECYCLE] component will unmount
      // console.log('>> component will unmount');
      console.log('채팅방을 나갔을 때');
      socket.close();
    };
    // eslint-disable-next-line
  }, []);

  const onTextChange = e => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    console.log('메시지를 보낼 때');

    socket.emit('chatMessage', {
      user_nickname: name,
      message,
      playlist_id: 0,
    });

    // setChats([...chats, { user_nickname: name, message }]);
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
      {/* <div className="render-chat">{renderChat()}</div> */}
      <div style={{ color: 'white' }}>
        {chats.map(chat => (
          <li>{`${chat.user_nickname}: ${chat.message}`}</li>
        ))}
      </div>
    </div>
  );
};

export default Chat;
