import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import Modal from 'react-bootstrap/Modal';

import '../../../css/Sign.css';
import * as user from '../../../api/user';
import * as validation from '../../../api/validation';

const SignUp = ({ isActive, signUp, handleClose }) => {
  const BASE_URL =
    'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/user';

  const [info, setInfo] = useState({
    nickname: '',
    email: '',
    password: '',
    checkPassword: '',
  });

  const [invalidText, setInvalidText] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const responseGoogle = async res => {
    // 구글 로그인을 통해 받아온 데이터
    // console.log('>>TOTAL: ', res);
    const { accessToken } = res;
    const { profileObj, tokenObj } = res;

    const { id_token } = tokenObj;

    const { email, googleId, imageUrl, name } = profileObj;
    // console.log('client accessToken:', accessToken);
    // console.log('client data:', email, googleId, imageUrl, name);

    const body = { email, googleId, imageUrl, name, id_token };
    // console.log('>> client will send this BODY', body);

    try {
      const { data, headers, status } = await user.oauthSignUp(
        body,
        accessToken
      );

      if (status === 200) {
        const { authorization } = headers;
        localStorage.setItem('authorization', authorization);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const responseFailGoogle = err => {
    // 에러발생시
    console.log(err);
  };

  const changeInfo = e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });

    validationCheck(e.target.id, e.target.value);
  };

  const validationCheck = async (type, value) => {
    const createRequest = async () => {
      try {
        const { status, data } = await validation.something(type, value);
        return status;
      } catch (error) {
        return error.response.status;
      }
    };

    // 비밀번호는 여기서 체크 X
    if (type === 'nickname' || type === 'email') {
      const status = await createRequest();
      if (status === 200 || value.length === 0) {
        // OK
        setInvalidText({
          ...invalidText,
          [type]: '',
        });
      } else {
        if (status === 202) {
          // 중복
          setInvalidText({
            ...invalidText,
            [type]: '이미 있습니다',
          });
        }
        if (status === 400) {
          // 형식에 맞게 작성
          setInvalidText({
            ...invalidText,
            [type]: '형식에 맞게 작성해주세요',
          });
        }
        if (status === 500) {
          // 서버 에러
          setInvalidText({
            ...invalidText,
            [type]: '서버 에러가 발생했습니다',
          });
        }
      }
    }
  };

  useEffect(() => {
    if (info.password === info.checkPassword)
      setInvalidText({
        ...invalidText,
        password: '',
      });
    else
      setInvalidText({
        ...invalidText,
        password: '비밀번호를 똑같이 작성해주세요',
      });
    // eslint-disable-next-line
  }, [info.password, info.checkPassword]);

  const onSignUpSubmit = async e => {
    const { email, password, nickname } = info;
    e.preventDefault();
    const isSuccess = await signUp({
      email,
      password,
      nickname,
    });

    if (isSuccess) handleClose();
    else alert('회원가입에 실패하였습니다');
  };

  return (
    <Modal show={isActive} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="signup">
          <div className="oauth">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="SignUp with Google"
              onSuccess={responseGoogle}
              onFailure={responseFailGoogle}
              cookiePolicy={'single_host_origin'}
            />
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
              <span className="info__invalid nickname--invalid">
                {invalidText.nickname}
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

              <span className="info__invalid email--invalid">
                {invalidText.email}
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
                className="info__input"
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
                className="info__input"
              />
              <span className="info__invalid password--invalid">
                {invalidText.password}
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
