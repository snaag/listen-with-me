import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

const Audience = ({ amount }) => {
  return (
    <div>
      <FontAwesomeIcon icon={['fas', 'users']} /> {numToString(amount)}
    </div>
  );
};

export default Audience;
