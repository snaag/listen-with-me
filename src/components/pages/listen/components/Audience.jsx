import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

const Audience = ({ listenerAmount }) => {
  console.log('listenerAmount (audience.jsx): ', listenerAmount);
  return (
    <div className="realtime-audience">
      <FontAwesomeIcon icon={['fas', 'users']} />
      <span className="realtime-audience__amount">
        {numToString(listenerAmount)}
      </span>
    </div>
  );
};

export default Audience;
