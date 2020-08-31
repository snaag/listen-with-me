import React from 'react';
import { useSelector } from 'react-redux';

import ListenPage from '../ListenPage';

const ListenPageContainer = () => {
  const { isAlong } = useSelector(({ along }) => along);
  return <ListenPage isAlong={isAlong} />;
};

export default ListenPageContainer;
