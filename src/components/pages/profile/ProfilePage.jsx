import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Picture from './components/Picture';
import Nickname from './components/Nickname';
import Audience from './components/Audience';
import Like from './components/Like';
import Description from './components/Description';
import '../../../css/Profile.css';

const verticalCenterStyle = {
  margin: 'auto 0',
};

const ProfilePage = ({
  info,
  getAudienceAmount,
  getLikeAmount,
  signIn,
  changeProfilePicture,
  changeDescription,
  changeNickname,
}) => {
  const {
    likeAmount,
    audienceAmount,
    nickname,
    profileURL,
    description,
  } = info;

  useEffect(() => {
    getAudienceAmount();
    getLikeAmount();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container profile-page">
      <div className="row justify-content-center">
        <div className="col-4">
          <Picture
            url={profileURL}
            changeProfilePicture={changeProfilePicture}
          />
        </div>
        <div className="col-4" style={verticalCenterStyle}>
          <div className="row mt-3 mb-3 profile-page__amount inner_info">
            <Audience amount={audienceAmount} className="profile__audience" />
            <Like amount={likeAmount} className="profile__like" />
          </div>
          <div className="row mt-3 mb-3 profile-page__nickname inner_info">
            <Nickname nickname={nickname} changeNickname={changeNickname} />
          </div>

          <div className="row mt-3 mb-3 profile-page__description inner_info">
            <Description
              description={description}
              changeDescription={changeDescription}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
