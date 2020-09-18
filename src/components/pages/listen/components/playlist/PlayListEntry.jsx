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
  console.log(music);

  const changeCurrentMusic = async () => {
    const authorization = localStorage.getItem('authorization');

    console.log(
      `보낼 데이터: roomId:${roomId}, music_id:${id}, authorization:${authorization}`
    );
    if (isHost) {
      console.log('>>Host가 방의 음악을 바꿉니다<<');

      /*
      try {
        const result = await axios({
          url: `${BASE_URL}/room`,
          method: 'PATCH',
          params: {
            id: roomId,
          },
          data: {
            music_id: id,
          },
          headers: {
            authorization,
          },
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      ERR>> currentMusic set을 할 수 없다
      */
      updateCurrentMusicId(id);
    } else {
      console.log('>>Guest가 음악을 바꿉니다<<');
      updateCurrentMusicId(id);
    }
  };
  return (
    <div onClick={() => changeCurrentMusic()}>
      <img
        style={{ width: '50px', height: '50px' }}
        src={thumbnails}
        alt={title}
      />
      <span>{title}</span>
      <span>{artist}</span>
    </div>
  );
};

export default PlayListEntry;
