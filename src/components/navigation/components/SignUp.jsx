import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const SignUp = ({ isActive, signUp, handleClose }) => {
  const [info, setInfo] = useState({
    nickname: '',
    email: '',
    cert: '',
    password: '',
    checkPassword: '',
  });

  const [valid, setValid] = useState({
    nickname: false,
    email: false,
  });

  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');

  const changeInfo = e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (info.password !== info.checkPassword)
      setCheckPasswordMessage('비밀번호를 동일하게 작성해주세요');
    else setCheckPasswordMessage('');
  }, [info]);

  const onSignUpSubmit = e => {
    const { email, password, nickname } = info;
    e.preventDefault();
    signUp({
      email,
      password,
      nickname,
    });
    handleClose();
  };

  return (
    <Modal show={isActive} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button>Google 회원가입</button>
        <br />
        <button>Kakao 회원가입</button>
        <br />
        <hr />
        <form onSubmit={onSignUpSubmit}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="name"
            id="nickname"
            onChange={changeInfo}
            value={info.nickname}
          />
          <button>중복 확인</button>
          <br />
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            onChange={changeInfo}
            value={info.email}
          />
          <button>중복 확인</button>
          <br />
          <label htmlFor="cert">인증번호</label>
          <input
            type="text"
            id="cert"
            onChange={changeInfo}
            value={info.cert}
          />
          <br />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            onChange={changeInfo}
            value={info.password}
          />
          <br />
          <label htmlFor="checkPassword">비밀번호 확인</label>
          <input
            type="password"
            id="checkPassword"
            onChange={changeInfo}
            value={info.checkPassword}
          />
          <span>{checkPasswordMessage}</span>
          <br />
          <button>회원가입</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
