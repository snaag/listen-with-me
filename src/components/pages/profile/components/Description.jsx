import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../../../css/Profile.css';

const Description = ({ description, changeDescription }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);

  const updateIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeDescription = () => {
    updateIsEdit();
    changeDescription(currentDescription);
  };

  return (
    <div className="description">
      {isEdit ? (
        <>
          <button
            onClick={handleChangeDescription}
            className="description__button"
          >
            <FontAwesomeIcon icon={['fas', 'save']} />
          </button>
          <input
            type="text"
            placeholder={description}
            onChange={e => setCurrentDescription(e.target.value)}
            className="description__input"
          />
        </>
      ) : (
        <>
          <button onClick={updateIsEdit} className="description__button">
            <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
          </button>
          <span className="description__show">{description}</span>
        </>
      )}
    </div>
  );
};

export default Description;
