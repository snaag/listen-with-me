import React from 'react';

import Audience from './Audience';
import Like from './Like';
import AlongContainer from '../containers/AlongContainer';

import '../../../../css/ListenMenu.css';

const Menu = () => {
  return (
    <div className="container-fluid menu">
      <div className="row">
        <div className="col">
          <div className="row">
            <Audience />
            <Like />
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
