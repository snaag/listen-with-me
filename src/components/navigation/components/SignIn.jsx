import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

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

  return (
    <Modal show={isActive} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button>Google 로그인</button>
        <br />
        <button>Kakao 로그인</button>
        <br />
        <hr />
        <form onSubmit={onSignInSubmit}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={info.email}
            onChange={changeInfo}
          />
          <br />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={info.password}
            onChange={changeInfo}
          />
          <br />
          <button>로그인</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
