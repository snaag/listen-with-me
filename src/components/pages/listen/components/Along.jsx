import React from 'react';

const Along = ({ isAlong, updateIsAlong }) => {
  const updateIsAlongStatus = () => {
    updateIsAlong(!isAlong);
  };

  return (
    <>
      <button onClick={updateIsAlongStatus}>
        따라 듣기 {isAlong ? 'OFF' : 'ON'}
      </button>
    </>
  );
};

export default Along;
