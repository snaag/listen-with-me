import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

const Audience = () => {
  return (
    <div className="realtime-audience">
      <span className="realtime-audience__icon">
        <FontAwesomeIcon icon={['fas', 'users']} />
        <span className="realtime-audience__amount">{numToString(5100)}</span>
      </span>
    </div>
  );
};

export default Audience;
