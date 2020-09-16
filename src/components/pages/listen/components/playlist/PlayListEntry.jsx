import React from 'react';

const PlayListEntry = ({ music, updateCurrentMusic }) => {
  // id, artist, createdAt, musicURL, playlist_id, thumbnails, title, updatedAt
  const { artist, musicURL, thumbnails, title } = music;
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
  return (
    <div onClick={() => updateCurrentMusic(music)}>
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
