import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import ListenPage from '../ListenPage';
import { updateCurrentMusic, updateMusics } from '../../../../modules/music';

const ListenPageContainer = () => {
  const { isAlong } = useSelector(({ along }) => along);
  const { currentMusic, musics } = useSelector(({ music }) => music);

  const [onUpdateCurrentMusic, onUpdateMusics] = useActions(
    [updateCurrentMusic, updateMusics],
    []
  );

  return (
    <ListenPage
      isAlong={isAlong}
      currentMusic={currentMusic}
      musics={musics}
      updateCurrentMusic={onUpdateCurrentMusic}
      updateMusics={onUpdateMusics}
    />
  );
};

export default ListenPageContainer;
