import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { GoogleLogin } from 'react-google-login';

import '../../../css/Sign.css';

const SignIn = ({ isActive, signIn, handleClose }) => {
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });

  const changeInfo = e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };
  const onSignInSubmit = e => {
    e.preventDefault();
    signIn(info);
    handleClose();
  };

  const responseGoogle = res => {
    // 서버로 토큰을 전달한 후 JWT토큰을 받고 localStorage에 저장해야한다
    console.log(res.tokenId);
    // axios
    //   .post('http://localhost:4000/auth', {
    //     id_token: res.tokenId,
    //   })
    //   .then(function (response) {
    //     localStorage.setItem('token', response.data.token);

    //     // isLogin 상태값을 true로 변경한다.
    //     // dispatch(loginCheck());
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const responseFailGoogle = err => {
    // 에러발생시
    console.log(err);
  };

  return (
    <Modal
      show={isActive}
      onHide={handleClose}
      animation={true}
      className="signin__modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="signin">
          <div className="oauth">
            {/* <button className="oauth__google oauth__button">
              Google 로그인
            </button> */}
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseFailGoogle}
              cookiePolicy={'single_host_origin'}
            />

            <button className="oauth__kakao oauth__button">Kakao 로그인</button>
          </div>
          <hr />
          <form onSubmit={onSignInSubmit} className="signin__info">
            <div className="info">
              <label htmlFor="email" className="info__label">
                이메일
              </label>
              <input
                className="info__input"
                type="email"
                id="email"
                value={info.email}
                onChange={changeInfo}
              />
            </div>
            <div className="info">
              <label htmlFor="password" className="info__label">
                비밀번호
              </label>
              <input
                className="info__input"
                type="password"
                id="password"
                value={info.password}
                onChange={changeInfo}
              />
            </div>

            <button className="signin__button sign__button">로그인</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
