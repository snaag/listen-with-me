import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

// const Audience = ({ amount }) => {
const Audience = () => {
  return (
    <div className="realtime-audience">
      <FontAwesomeIcon icon={['fas', 'users']} />
      <span className="realtime-audience__amount">{numToString(5000)}</span>
    </div>
  );
};

export default Audience;
