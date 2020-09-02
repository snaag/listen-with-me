import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../lib/useActions';

import Navigation from '../Navigation';
import {
  setSignInActive,
  setSignInInactive,
  setSignUpActive,
  setSignUpInactive,
} from '../../../modules/modal';

const NavigationContainer = () => {
  const { isSignIn, isLoading } = useSelector(({ user }) => user.status);
  const { nickname } = useSelector(({ user }) => user.info);
  const modalsStatus = useSelector(({ modal }) => modal);

  const [
    onSetSignInActive,
    onSetSignInInactive,
    onSetSignUpActive,
    onSetSignUpInactive,
  ] = useActions(
    [setSignInActive, setSignInInactive, setSignUpActive, setSignUpInactive],
    []
  );

  return (
    <Navigation
      isSignIn={isSignIn}
      isLoading={isLoading}
      nickname={nickname}
      modalsStatus={modalsStatus}
      setSignInActive={onSetSignInActive}
      setSignInInactive={onSetSignInInactive}
      setSignUpActive={onSetSignUpActive}
      setSignUpInactive={onSetSignUpInactive}
    />
  );
};

export default NavigationContainer;
