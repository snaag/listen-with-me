import React, { useState, useEffect, useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';
import Modal from 'react-bootstrap/Modal';

import '../../../css/Sign.css';
import * as validation from '../../../api/validation';

const SignUp = ({ isActive, signUp, signUpOauth, handleClose }) => {
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

  const [isSignUpAble, setIsSignUpAble] = useState(false);

  const checkSignUpAble = useCallback(() => {
    if (
      invalidText.nickname.trim().length === 0 &&
      invalidText.email.trim().length === 0 &&
      invalidText.password.trim().length === 0
    ) {
      // invaild text가 모두 ''인 경우
      console.log('checkSignUpAble, [invalidText] 통과]');
      if (
        info.nickname.trim().length > 0 &&
        info.email.trim().length > 0 &&
        info.password.length > 0 &&
        info.checkPassword.length > 0 &&
        info.password === info.checkPassword
      ) {
        // info에 내용이 있고, 모두 올바른 경우
        console.log('checkSignUpAble, [모두] 통과');

        setIsSignUpAble(true);
      } else {
        // info에 내용이 올바르지 않은 경우
        console.log('checkSignUpAble, [info] 실패!!');
      }
    } else {
      // invalid text에 뭐가 있는 경우
      console.log('checkSignUpAble, [invalidText] 실패!!');
    }
  }, [info, invalidText]);

  useEffect(() => {
    checkSignUpAble();
  }, [invalidText, info, checkSignUpAble]);

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
      const isSuccess = await signUpOauth(body, accessToken);
      if (isSuccess) handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const responseFailGoogle = err => {
    // 에러발생시
    console.log(err);
  };

  const changeInfo = async e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
    validationCheck(e.target.id, e.target.value);
  };

  useState(() => {
    console.log('회원가입이 가능한가요? ', isSignUpAble ? '네' : '아니오');
  }, [isSignUpAble]);

  const validationCheck = async (type, value) => {
    const createRequest = async () => {
      try {
        const { status, data } = await validation.something(type, value);
        return status;
      } catch (error) {
        throw error;
      }
    };

    if (type === 'nickname' || type === 'email') {
      const status = await createRequest();
      if (status === 200 || value.length === 0) {
        setIsSignUpAble(true);
        // OK
        setInvalidText({
          ...invalidText,
          [type]: '',
        });
      } else {
        setIsSignUpAble(false);
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
    if (info.password === info.checkPassword) {
      setInvalidText({
        ...invalidText,
        password: '',
      });
    } else {
      setInvalidText({
        ...invalidText,
        password: '비밀번호를 똑같이 작성해주세요',
      });
    }

    // eslint-disable-next-line
  }, [info.password, info.checkPassword]);

  const onSignUpSubmit = async e => {
    const { email, checkPassword, password, nickname } = info;
    e.preventDefault();
    // 만약 데이터가 없다면 회원가입 시도 안되도록 함
    if (isSignUpAble) {
      console.log('signup 가능합니다, isSignUpAble:', isSignUpAble);
      const isSuccess = await signUp({
        email,
        password,
        checkPassword,
        nickname,
      });

      if (isSuccess) handleClose();
      else alert('회원가입에 실패하였습니다');
    } else {
      console.log('signup 안됩니다, isSignUpAble:', isSignUpAble);
      alert('이메일과 닉네임과 비밀번호를 모두 입력해주세요');
    }
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
              buttonText="구글 계정으로 회원가입 하기"
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

            <button
              disabled={!isSignUpAble}
              className="signup__button sign__button"
            >
              회원가입
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
