import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import ListenPage from '../ListenPage';
import {
  updateCurrentMusicId,
  updateMusics,
  playNextMusic,
} from '../../../../modules/music';
import {
  setRoomId,
  setIsClosed,
  setWantToStay,
} from '../../../../modules/room';

const ListenPageContainer = () => {
  const { info } = useSelector(({ user }) => user);
  const { isAlong } = useSelector(({ along }) => along);
  const { roomId, isClosed, wantToStay } = useSelector(({ room }) => room);
  const { musics, currentMusicId } = useSelector(({ music }) => music);

  const [
    onUpdateCurrentMusicId,
    onUpdateMusics,
    onSetRoomId,
    onPlayNextMusic,
    onSetIsClosed,
    onSetWantToStay,
  ] = useActions(
    [
      updateCurrentMusicId,
      updateMusics,
      setRoomId,
      playNextMusic,
      setIsClosed,
      setWantToStay,
    ],
    []
  );

  return (
    <ListenPage
      name={info.nickname}
      isAlong={isAlong}
      rId={roomId}
      isClosed={isClosed}
      wantToStay={wantToStay}
      currentMusicId={currentMusicId}
      musics={musics}
      updateMusics={onUpdateMusics}
      setRoomId={onSetRoomId}
      playNextMusic={onPlayNextMusic}
      updateCurrentMusicId={onUpdateCurrentMusicId}
      setIsClosed={onSetIsClosed}
      setWantToStay={onSetWantToStay}
    />
  );
};

export default ListenPageContainer;
