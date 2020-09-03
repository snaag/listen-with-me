import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:4000');

// 유저의 아이디로, 어떤 유저가 말 한 것인지에 따라 말풍선 다르게 해주기
const Chat = ({ name, profileURL }) => {
  const [state, setState] = useState({ message: '', name });
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // socket.emit('joinRoom', { room: 'jsroom', name });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // socket.on('message', ({ name, message }) => {
    //   setChats([...chats, { name, message }]);
    // });
  });

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = e => {
    // e.preventDefault();
    // const { name, message } = state;
    // socket.emit('message', { name, message });
    // setState({ message: '', name });
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
    <div>
      <form onSubmit={onMessageSubmit}>
        <div>
          <input
            type="text"
            name="message"
            value={state.message}
            onChange={onTextChange}
          />
          <button>전송</button>
        </div>
      </form>
      <div className="render-chat">{renderChat()}</div>
    </div>
  );
};

export default Chat;
