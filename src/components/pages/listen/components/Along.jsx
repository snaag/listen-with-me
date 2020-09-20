import React from 'react';

const Along = ({ isAlong, updateIsAlong }) => {
  const updateIsAlongStatus = () => {
    updateIsAlong(!isAlong);
    localStorage.setItem('isAlong', !isAlong);
  };

  return (
    <>
      <div className="along">
        <span className="along__title">같이 듣기</span>
        <div className="along__inner">
          <input
            type="checkbox"
            checked={isAlong}
            onClick={updateIsAlongStatus}
          />
          <label htmlFor="" className="along__on">
            ON
          </label>
          <label htmlFor="" className="along__off">
            OFF
          </label>
        </div>
      </div>
    </>
  );
};

export default Along;
