import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as room from '../../../../api/roomInfo';

const Like = ({ playlistId }) => {
  // isLiked: 내가 이 플레이리스트를 이전에 좋아한 적이 있는지를 말함
  const [isLiked, setIsLiked] = useState();
  const authorization = localStorage.getItem('authorization');

  useEffect(() => {
    const initializeLike = async () => {
      const { data, status } = await room.getLikeStatus(
        playlistId,
        authorization
      );
      if (status === 200) {
        const { likeStatus } = data;
        setIsLiked(likeStatus);
      }
    };
    initializeLike();
  }, [authorization, playlistId]);

  const submitLike = async () => {
    const request = async (api, doSomething, ...params) => {
      try {
        const { data, status } = await api(...params.slice(1));
        if (status === 200) {
          doSomething(params[0]);
        }
      } catch (error) {
        throw error;
      }
    };

    if (isLiked) {
      // 과거에 이 플레이리스트를 좋아하였으나
      // 좋아요를 취소하려는 상황
      try {
        request(
          room.removeLikeStatus,
          setIsLiked,
          false,
          playlistId,
          authorization
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      // 이 플레이리스트에 좋아요를 클릭하는 상황
      try {
        request(
          room.setLikeStatus,
          setIsLiked,
          true,
          playlistId,
          authorization
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="like-playlist">
      <button onClick={submitLike} className="like-playlist__button">
        {isLiked ? (
          <FontAwesomeIcon icon={['fas', 'heart']} />
        ) : (
          <FontAwesomeIcon icon={['far', 'heart']} />
        )}
      </button>
    </div>
  );
};

export default Like;
