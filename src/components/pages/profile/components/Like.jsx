import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import numToString from '../../../../lib/numToString';

const Like = ({ amount }) => {
  return (
    <div>
      <FontAwesomeIcon icon={['fas', 'heart']} /> {numToString(amount)}
    </div>
  );
};

export default Like;
