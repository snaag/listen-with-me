import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

const Audience = ({ amount }) => {
  return (
    <div className="audience">
      <span className="audience__inner">
        <FontAwesomeIcon className="audience__icon" icon={['fas', 'users']} />
      </span>
      <span className="audience__amount">{numToString(amount)}</span>
    </div>
  );
};

export default Audience;
