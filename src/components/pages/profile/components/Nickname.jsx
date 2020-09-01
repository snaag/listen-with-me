import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div>
      {isEdit ? (
        <>
          <button onClick={handleChangeNickname}>
            <FontAwesomeIcon icon={['fas', 'save']} />
          </button>
          <input
            placeholder={nickname}
            value={currentNickname}
            onChange={e => setCurrentNickname(e.target.value)}
          />
        </>
      ) : (
        <>
          <button onClick={updateIsEdit}>
            <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
          </button>
          <span>{nickname}</span>
        </>
      )}
    </div>
  );
};

export default Nickname;
