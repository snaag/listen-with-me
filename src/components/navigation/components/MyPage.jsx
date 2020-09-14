import React from 'react';
import { withRouter } from 'react-router-dom';

const MyPage = ({ history }) => {
  const goToMainPage = () => {
    history.push('/profile');
  };
  return (
    <button className="user__button user__mypage" onClick={goToMainPage}>
      마이 페이지
    </button>
  );
};

export default withRouter(MyPage);
