import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div>
      {isEdit ? (
        <>
          <button onClick={handleChangeDescription}>
            <FontAwesomeIcon icon={['fas', 'save']} />
          </button>
          <input
            type="text"
            placeholder={description}
            onChange={e => setCurrentDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <button onClick={updateIsEdit}>
            <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
          </button>
          <span>{description}</span>
        </>
      )}
    </div>
  );
};

export default Description;
