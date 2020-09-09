import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = ({ history }) => {
  return (
    <div className="logo__inner">
      <span aria-label="notes" onClick={() => history.push('/main')}>
        <FontAwesomeIcon icon={['fas', 'music']} />
      </span>
    </div>
  );
};

export default withRouter(Logo);
