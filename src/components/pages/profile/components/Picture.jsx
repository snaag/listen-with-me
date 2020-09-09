import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../css/Picture.css';

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
    <div className="profile-picture">
      <img className="profile-picture__content" src={url} alt="" />
      <div className="profile-picture__filebox">
        <input
          type="file"
          id="filebox__upload"
          onChange={changeImage}
          accept="image/png, image/jpeg, image/jpg"
          hidden
        />
        <label for="filebox__upload">
          <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
        </label>
      </div>
    </div>
  );
};

export default Picture;
