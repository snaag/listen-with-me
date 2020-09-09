import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../../css/Sign.css';

const SignUp = ({ isActive, signUp, handleClose }) => {
  const [info, setInfo] = useState({
    nickname: '',
    email: '',
    password: '',
    checkPassword: '',
  });

  const [valid, setValid] = useState({
    nickname: false,
    email: false,
  });

  const [invalidText, setInvalidText] = useState({
    nickname: '...',
    email: '...',
  });

  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');

  const changeInfo = e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };

  const changeValid = e => {
    setValid({
      ...valid,
      [e.target.name]: e.target.value,
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
    // handleClose();
  };

  return (
    <Modal show={isActive} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="signup">
          <div className="oauth">
            <button className="oauth__google oauth__button">
              Google 회원가입
            </button>
            <button className="oauth__kakao oauth__button">
              Kakao 회원가입
            </button>
          </div>

          <hr />
          <form onSubmit={onSignUpSubmit} className="signup__info">
            <div className="info">
              <label htmlFor="nickname" className="info__label">
                닉네임
              </label>
              <input
                type="name"
                id="nickname"
                onChange={changeInfo}
                value={info.nickname}
                className="info__input"
              />
              <button className="info__validation-check">
                {valid.nickname ? (
                  <FontAwesomeIcon
                    className="info__validation-check--valid"
                    icon={['far', 'check-circle']}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="info__validation-check--invalid"
                    icon={['far', 'circle']}
                  />
                )}
              </button>
              <span className="info__invalid password--invalid">
                {checkPasswordMessage}
              </span>
            </div>
            <div className="info">
              <label htmlFor="email" className="info__label">
                이메일
              </label>
              <input
                type="email"
                id="email"
                onChange={changeInfo}
                value={info.email}
                className="info__input"
              />
              <button
                className="info__validation-check"
                onClick={() => setValid({ ...valid, email: true })}
              >
                {valid.email ? (
                  <FontAwesomeIcon
                    className="info__validation-check--valid"
                    icon={['far', 'check-circle']}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="info__validation-check--invalid"
                    icon={['far', 'circle']}
                  />
                )}
              </button>
              <span className="info__invalid password--invalid">
                {checkPasswordMessage}
              </span>
            </div>
            <div className="info">
              <label htmlFor="password" className="info__label">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                onChange={changeInfo}
                value={info.password}
                className="info__input info__input--long"
              />
            </div>
            <div className="info info__password">
              <label htmlFor="checkPassword" className="info__label">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="checkPassword"
                onChange={changeInfo}
                value={info.checkPassword}
                className="info__input info__input--long"
              />
              <span className="info__invalid password--invalid">
                {checkPasswordMessage}
              </span>
            </div>

            <button className="signup__button sign__button">회원가입</button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
