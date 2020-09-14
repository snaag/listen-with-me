import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../../../css/Profile.css';

const Nickname = ({ nickname, changeNickname }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentNickname, setCurrentNickname] = useState(nickname);

  const updateIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeNickname = () => {
    updateIsEdit();
    changeNickname(currentNickname);
  };
  return (
    <div className="nickname">
      {isEdit ? (
        <>
          <button onClick={handleChangeNickname} className="nickname__button">
            <FontAwesomeIcon icon={['fas', 'save']} />
          </button>
          <input
            placeholder={nickname}
            value={currentNickname}
            onChange={e => setCurrentNickname(e.target.value)}
            className="nickname__input"
          />
        </>
      ) : (
        <>
          <button onClick={updateIsEdit} className="nickname__button">
            <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
          </button>
          <span className="nickname__show">{nickname}</span>
        </>
      )}
    </div>
  );
};

export default Nickname;
