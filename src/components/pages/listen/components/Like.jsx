import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = () => {
  return (
    <>
      <button>
        <FontAwesomeIcon icon={['fas', 'heart']} />
        <FontAwesomeIcon icon={['far', 'heart']} />
      </button>
    </>
  );
};

export default Like;
