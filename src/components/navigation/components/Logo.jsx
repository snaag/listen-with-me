import React from 'react';
import { withRouter } from 'react-router-dom';

const Logo = ({ history }) => {
  return (
    <div className="logo__inner">
      <span role="img" aria-label="notes" onClick={() => history.push('/main')}>
        🎶
      </span>
    </div>
  );
};

export default withRouter(Logo);
