import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = () => {
  return (
    <div className="like-playlist">
      <button className="like-playlist__button">
        <FontAwesomeIcon icon={['fas', 'heart']} />
        {/* <FontAwesomeIcon icon={['far', 'heart']} /> */}
      </button>
    </div>
  );
};

export default Like;
