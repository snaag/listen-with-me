import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';

import Logo from './components/Logo';
import Title from './components/Title';
import SignIn from './components/SignIn'; // 로그인
import SignUp from './components/SignUp'; // 회원가입
import SignOut from './components/SignOut'; // 로그아웃
import MyPage from './components/MyPage'; // 마이페이지

const Navigation = ({
  isSignIn,
  isLoading,
  nickname,
  modalsStatus,
  setSignInActive,
  setSignInInactive,
  setSignUpActive,
  setSignUpInactive,
  history,
}) => {
  const { signInModalActive, signUpModalActive } = modalsStatus;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-3">
          <div className="row float-left">
            <Logo />
          </div>
        </div>
        <div className="col-6">
          <div className="row" style={{ background: 'LIGHTSALMON' }}>
            <Title />
          </div>
        </div>
        <div className="col-3">
          <div className="row float-right">
            {isSignIn && (
              <>
                <button>로그아웃</button>
                <button onClick={() => history.push('/profile')}>
                  마이페이지
                </button>
              </>
            )}
            {!isSignIn &&
              (isLoading ? (
                <FontAwesomeIcon icon={['fa', 'spinner']} pulse />
              ) : (
                <>
                  <button onClick={() => setSignInActive()}>로그인</button>
                  <button onClick={() => setSignUpActive()}>회원 가입</button>
                </>
              ))}
          </div>
        </div>
      </div>
      {signInModalActive && (
        <SignIn isActive={signInModalActive} handleClose={setSignInInactive} />
      )}
      {signUpModalActive && (
        <SignUp isActive={signUpModalActive} handleClose={setSignUpInactive} />
      )}
    </div>
  );
};

export default withRouter(Navigation);
