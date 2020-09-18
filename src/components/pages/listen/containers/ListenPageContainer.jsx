import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import ListenPage from '../ListenPage';
import {
  updateCurrentMusicId,
  updateMusics,
  playNextMusic,
} from '../../../../modules/music';
import { setRoomId } from '../../../../modules/room';

const ListenPageContainer = () => {
  const { isAlong } = useSelector(({ along }) => along);
  const { roomId } = useSelector(({ room }) => room);
  const { musics, currentMusicId } = useSelector(({ music }) => music);

  const [
    onUpdateCurrentMusicId,
    onUpdateMusics,
    onSetRoomId,
    onPlayNextMusic,
  ] = useActions(
    [updateCurrentMusicId, updateMusics, setRoomId, playNextMusic],
    []
  );

  return (
    <ListenPage
      isAlong={isAlong}
      rId={roomId}
      currentMusicId={currentMusicId}
      musics={musics}
      updateMusics={onUpdateMusics}
      setRoomId={onSetRoomId}
      playNextMusic={onPlayNextMusic}
      updateCurrentMusicId={onUpdateCurrentMusicId}
    />
  );
};

export default ListenPageContainer;
