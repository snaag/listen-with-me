import React from 'react';
import { useSelector } from 'react-redux';

import Chat from '../components/chat/Chat';

const ChatContainer = () => {
  const { nickname, profileURL } = useSelector(({ user }) => user.info);

  return <Chat name={nickname} profileURL={profileURL} />;
};

export default ChatContainer;
