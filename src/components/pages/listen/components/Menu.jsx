import React from 'react';

import Audience from './Audience';
import Like from './Like';
import SyncTransition from './SyncTransition';

const Menu = () => {
  return (
    <div style={{ backgroundColor: 'green' }} className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="row">
            <Audience />
            <Like />
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <SyncTransition />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
