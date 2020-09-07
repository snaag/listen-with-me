import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

const Like = ({ amount }) => {
  return (
    <div className="like">
      <span className="like__inner">
        <FontAwesomeIcon className="like__icon" icon={['fas', 'heart']} />
      </span>
      <span className="like__amount">{numToString(amount)}</span>
    </div>
  );
};

export default Like;
