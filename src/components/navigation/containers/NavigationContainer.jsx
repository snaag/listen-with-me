import React from 'react';
import { useSelector } from 'react-redux';

import Navigation from '../Navigation';

const NavigationContainer = () => {
  const { isSignIn, isLoading } = useSelector(({ user }) => user.status);
  const { nickname } = useSelector(({ user }) => user.info);

  return (
    <Navigation isSignIn={isSignIn} isLoading={isLoading} nickname={nickname} />
  );
};

export default NavigationContainer;
