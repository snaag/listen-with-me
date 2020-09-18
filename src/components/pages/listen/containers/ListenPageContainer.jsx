import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import ListenPage from '../ListenPage';
import { updateCurrentMusic, updateMusics } from '../../../../modules/music';
import { setRoomId } from '../../../../modules/room';

const ListenPageContainer = () => {
  const { isAlong } = useSelector(({ along }) => along);
  const { roomId } = useSelector(({ room }) => room);
  const { currentMusic, musics } = useSelector(({ music }) => music);

  const [onUpdateCurrentMusic, onUpdateMusics, onSetRoomId] = useActions(
    [updateCurrentMusic, updateMusics, setRoomId],
    []
  );

  return (
    <ListenPage
      isAlong={isAlong}
      rId={roomId}
      currentMusic={currentMusic}
      musics={musics}
      updateCurrentMusic={onUpdateCurrentMusic}
      updateMusics={onUpdateMusics}
      setRoomId={onSetRoomId}
    />
  );
};

export default ListenPageContainer;
