import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../css/Picture.css';

const Picture = ({ url, changeProfilePicture }) => {
  const changeImage = e => {
    // https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
    const target = e.target || window.event.srcElement,
      files = target.files;

    if (FileReader && files && files.length) {
      changeProfilePicture(files);
    }

    // Not supported
    else {
      console.log('file reader not support');
    }
  };

  return (
    <div className="profile-picture float-right">
      {url === null ? (
        <img className="profile-picture__content--null" />
      ) : (
        <img className="profile-picture__content" src={url} alt="" />
      )}

      <div className="profile-picture__filebox">
        <input
          name="file"
          type="file"
          id="filebox__upload"
          onChange={changeImage}
          accept="image/png, image/jpeg, image/jpg"
          hidden
        />
        <label htmlFor="filebox__upload">
          <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
        </label>
      </div>
    </div>
  );
};

export default Picture;
