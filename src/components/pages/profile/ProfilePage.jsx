import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../../../css/Picture.css';
import Picture from './components/Picture';
import Nickname from './components/Nickname';
import Audience from './components/Audience';
import Like from './components/Like';
import Description from './components/Description';

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
    signIn();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <Picture
            url={profileURL}
            changeProfilePicture={changeProfilePicture}
          />
        </div>
        <div className="col-4">
          <div className="row">
            <Nickname nickname={nickname} changeNickname={changeNickname} />
          </div>
          <div className="row">
            <Audience amount={audienceAmount} />
            <Like amount={likeAmount} />
          </div>
          <div className="row">
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
