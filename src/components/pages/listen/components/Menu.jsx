import React from 'react';

import Like from './Like';
import AlongContainer from '../containers/AlongContainer';
import ExitRoom from './ExitRoom';
import '../../../../css/ListenMenu.css';

const Menu = ({ playlistId, listenerAmount, finalizeRoom }) => {
  return (
    <div className="container-fluid menu">
      <div className="row">
        <div className="col">
          <div className="row">
            <ExitRoom finalizeRoom={finalizeRoom} />
            <Like playlistId={playlistId} />
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <AlongContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
