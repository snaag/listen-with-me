import React from 'react';

import PlayListEntry from './PlayListEntry';

const PlayList = ({
  musics,
  updateCurrentMusicId,
  isAlong,
  roomId,
  isHost,
}) => {
  return (
    <div className="play-list">
      {Object.keys(musics).map(key => (
        <PlayListEntry
          key={musics[key].id}
          music={musics[key]}
          updateCurrentMusicId={updateCurrentMusicId}
          isAlong={isAlong}
          roomId={roomId}
          isHost={isHost}
        />
      ))}
    </div>
  );
};

export default PlayList;
