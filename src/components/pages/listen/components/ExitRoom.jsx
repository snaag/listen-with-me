import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExitRoom = ({ finalizeRoom, history }) => {
  const isHost = JSON.parse(localStorage.getItem('isHost'));
  const outFromRoom = () => {
    if (isHost) {
      const result = window.confirm('방을 삭제하시겠습니까?');
      if (result) {
        localStorage.setItem('joined', false);
        finalizeRoom();
        localStorage.removeItem('isHost');
        history.push('/');
      }
    } else {
      localStorage.setItem('joined', false);
      finalizeRoom();
      history.push('/');
    }
  };
  return (
    <div className="exit-room">
      <button className="exit-room__button" onClick={outFromRoom}>
        <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
      </button>
    </div>
  );
};

export default withRouter(ExitRoom);
