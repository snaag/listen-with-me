import React from 'react';
import { withRouter } from 'react-router-dom';

const Logo = ({ history }) => {
  return (
    <div>
      <button onClick={() => history.push('/main')}>🎶</button>
    </div>
  );
};

export default withRouter(Logo);
