import React from 'react';
import axios from 'axios';

const BASE_URL =
  'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000';

const PlayListEntry = ({ music, updateCurrentMusicId, isHost, roomId }) => {
  // id, artist, createdAt, musicURL, playlist_id, thumbnails, title, updatedAt
  const { id, artist, musicURL, thumbnails, title } = music;
  /*
  artist: "CigarettesAfterSex"
  createdAt: "2020-09-16T08:12:51.000Z"
  id: 146
  musicURL: "https://www.youtube.com/embed/L4sbDxR22z4"
  playlist_id: 70
  thumbnails: "https://i.ytimg.com/vi/L4sbDxR22z4/hqdefault.jpg"
  title: "K. - Cigarettes After Sex"
  updatedAt: "2020-09-16T08:12:51.000Z"
  */
  // console.log(music);

  const changeCurrentMusic = async () => {
    const authorization = localStorage.getItem('authorization');

    console.log(
      `보낼 데이터: roomId:${roomId}, music_id:${id}, authorization:${authorization}`
    );
    if (isHost) {
      console.log('>>Host가 방의 음악을 바꿉니다<<');
      updateCurrentMusicId(id);
    } else {
      console.log('>>Guest가 음악을 바꿉니다<<');
      updateCurrentMusicId(id);
    }
  };
  return (
    <div className="play-list__inner" onClick={() => changeCurrentMusic()}>
      <img src={thumbnails} alt={title} className="list-item__image" />
      <div className="list-item__detail">
        <span className="list-item__title">{title}</span>
        <span className="list-item__artist">{artist}</span>
      </div>
    </div>
  );
};

export default PlayListEntry;
