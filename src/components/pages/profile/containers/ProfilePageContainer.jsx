import React from 'react';
import useActions from '../../../../lib/useActions';
import { useSelector } from 'react-redux';

import ProfilePage from '../ProfilePage';
import {
  signIn, // 나중에 지울 예정
  getLikeAmount,
  getAudienceAmount,
  updateProfilePicture,
  updateDescription,
  updateNickname,
} from '../../../../modules/user';

const ProfilePageContainer = () => {
  const { info } = useSelector(({ user }) => user);
  const [
    onGetLikeAmount,
    onGetAudienceAmount,
    onGetSignIn,
    onUpdateProfilePicture,
    onUpdateDescription,
    onUpdateNickname,
  ] = useActions(
    [
      getLikeAmount,
      getAudienceAmount,
      signIn,
      updateProfilePicture,
      updateDescription,
      updateNickname,
    ],
    []
  );

  return (
    <ProfilePage
      info={info}
      getLikeAmount={onGetLikeAmount}
      getAudienceAmount={onGetAudienceAmount}
      signIn={onGetSignIn}
      changeProfilePicture={onUpdateProfilePicture}
      changeDescription={onUpdateDescription}
      changeNickname={onUpdateNickname}
    />
  );
};

export default ProfilePageContainer;
