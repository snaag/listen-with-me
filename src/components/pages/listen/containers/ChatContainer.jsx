import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import Chat from '../components/chat/Chat';
import { addChat, setChat } from '../../../../modules/chat';

const ChatContainer = ({ sendChat }) => {
  const { nickname, profileURL } = useSelector(({ user }) => user.info);
  const { chats } = useSelector(({ chat }) => chat);
  const { roomId } = useSelector(({ room }) => room);

  const [onAddChat, onSetChat] = useActions([addChat, setChat], []);

  return (
    <Chat
      name={nickname}
      profileURL={profileURL}
      chats={chats}
      addChat={onAddChat}
      setChat={onSetChat}
      roomId={roomId}
      sendChat={sendChat}
    />
  );
};

export default ChatContainer;
