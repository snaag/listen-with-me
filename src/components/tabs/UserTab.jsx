import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../css/UserTab.css';
const BASE_URL = 'http://localhost:3000';

const UserTab = ({ history }) => {
  const changePage = e => {
    history.push(`/${e.target.name}`);
  };
  return (
    <div className="tab">
      <ul className="tab__inner clearfix">
        <li className="tab__item tab__music">
          <button onClick={changePage} name="music">
            음악
          </button>
        </li>
        <li className="tab__item tab__playlist">
          <button onClick={changePage} name="playlist">
            내 플레이리스트
          </button>
        </li>
        <li className="tab__item tab__profile">
          <button onClick={changePage} name="profile">
            프로필
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(UserTab);
