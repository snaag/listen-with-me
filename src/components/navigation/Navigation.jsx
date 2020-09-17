import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Navigation.css';

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
  signIn,
  signInOauth,
  signUp,
  signUpOauth,
  signOut,
  history,
}) => {
  const { signInModalActive, signUpModalActive } = modalsStatus;

  return (
    <div className="container-fluid navigation">
      <div className="row justify-content-center navigation_inner">
        <div className="col-3">
          <div className="row float-left logo">
            <Logo />
          </div>
        </div>
        <div className="col-6">
          <div className="row title">
            <Title />
          </div>
        </div>
        <div className="col-3">
          <div className="row float-right user">
            {isSignIn && (
              <>
                <SignOut signOut={signOut} />
                <MyPage />
              </>
            )}
            {!isSignIn &&
              (isLoading ? (
                <FontAwesomeIcon
                  className="user__is-loading"
                  icon={['fa', 'spinner']}
                  pulse
                />
              ) : (
                <>
                  <button
                    className="user__signin user__button"
                    onClick={() => setSignInActive()}
                  >
                    로그인
                  </button>
                  <button
                    className="user__signup user__button"
                    onClick={() => setSignUpActive()}
                  >
                    회원 가입
                  </button>
                </>
              ))}
          </div>
        </div>
      </div>
      {signInModalActive && (
        <SignIn
          isActive={signInModalActive}
          handleClose={setSignInInactive}
          signIn={signIn}
          signInOauth={signInOauth}
        />
      )}
      {signUpModalActive && (
        <SignUp
          isActive={signUpModalActive}
          handleClose={setSignUpInactive}
          signUp={signUp}
          signUpOauth={signUpOauth}
        />
      )}
    </div>
  );
};

export default withRouter(Navigation);
