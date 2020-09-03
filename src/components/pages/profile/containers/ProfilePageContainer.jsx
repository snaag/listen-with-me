import React from 'react';
import useActions from '../../../../lib/useActions';
import { useSelector } from 'react-redux';

import ProfilePage from '../ProfilePage';
import {
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
    onUpdateProfilePicture,
    onUpdateDescription,
    onUpdateNickname,
  ] = useActions(
    [
      getLikeAmount,
      getAudienceAmount,
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
      changeProfilePicture={onUpdateProfilePicture}
      changeDescription={onUpdateDescription}
      changeNickname={onUpdateNickname}
    />
  );
};

export default ProfilePageContainer;
