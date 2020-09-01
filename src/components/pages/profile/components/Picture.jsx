import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Picture = ({ url, changeProfilePicture }) => {
  const changeImage = e => {
    // https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
    const target = e.target || window.event.srcElement,
      files = target.files;

    // FileReader support
    if (FileReader && files && files.length) {
      const fileReader = new FileReader();
      fileReader.onload = function() {
        changeProfilePicture(fileReader.result);
      };
      fileReader.readAsDataURL(files[0]);
    }

    // Not supported
    else {
      console.log('file reader not support');
    }
  };

  return (
    <div className="edit-profile">
      <div className="picture">
        <img className="picture__content" src={url} alt="프로필 이미지" />
      </div>

      <div className="filebox">
        <label htmlFor="filebox__upload">
          <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
        </label>
        <input
          type="file"
          id="filebox__upload"
          onChange={changeImage}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </div>
  );
};

export default Picture;
