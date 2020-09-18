import React from 'react';

import Audience from './Audience';
import Like from './Like';
import AlongContainer from '../containers/AlongContainer';
import ExitRoom from './ExitRoom';
import '../../../../css/ListenMenu.css';

const Menu = ({ playlistId, finalizeRoom }) => {
  return (
    <div className="container-fluid menu">
      <div className="row">
        <div className="col">
          <div className="row">
            <ExitRoom finalizeRoom={finalizeRoom} />
            <Audience />
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
