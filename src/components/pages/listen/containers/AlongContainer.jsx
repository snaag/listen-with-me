import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../../lib/useActions';

import Along from '../components/Along';
import { updateIsAlong } from '../../../../modules/along';

const AlongContainer = () => {
  const { isAlong } = useSelector(({ along }) => along);
  const [onUpdateIsAlong] = useActions([updateIsAlong], []);

  return <Along isAlong={isAlong} updateIsAlong={onUpdateIsAlong} />;
};

export default AlongContainer;
