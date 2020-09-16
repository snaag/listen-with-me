import React from 'react';

import PlayListEntry from './PlayListEntry';

const PlayList = ({ musics, updateCurrentMusic }) => {
  return (
    <div className="play-list">
      {musics.map(music => (
        <PlayListEntry
          key={music.id}
          music={music}
          updateCurrentMusic={updateCurrentMusic}
        />
      ))}
    </div>
  );
};

export default PlayList;
