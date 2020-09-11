import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import Chat from '../components/chat/Chat';
import { addChat } from '../../../../modules/chat';

const ChatContainer = () => {
  const { nickname, profileURL } = useSelector(({ user }) => user.info);
  const { chats } = useSelector(({ chat }) => chat);

  const [onAddChat] = useActions([addChat], []);

  return (
    <Chat
      name={nickname}
      profileURL={profileURL}
      chats={chats}
      addChat={onAddChat}
    />
  );
};

export default ChatContainer;
