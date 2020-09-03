import React from 'react';

const SignOut = ({ signOut }) => {
  return (
    <button className="user__button" onClick={signOut}>
      로그아웃
    </button>
  );
};

export default SignOut;
