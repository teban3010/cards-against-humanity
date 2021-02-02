import React, { useContext, useEffect } from 'react';

import FinishedGame from 'components/Game/FinishedGame';
import Loading from 'components/Loading';
import NewGame from 'components/Game/NewGame';
import PlayingGame from 'components/Game/PlayingGame';
import { SocketContext } from 'context/SocketContext';
import { Text } from '@chakra-ui/react';
import { useRoom } from 'hooks/useGraph';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import withAuth from 'hoc/withAuth';

const Room = () => {
  const router = useRouter();
  const { loading, error, data, refetch } = useRoom(router.query.id);
  const { subscribe, unSubscribe } = useContext(SocketContext);
  const { user } = useUser();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const refetchRoom = () => refetch();

    subscribe(`newPlayer_${router.query.id}`, refetchRoom);
    subscribe(`startGame_${router.query.id}`, refetchRoom);
    subscribe(`winner_${router.query.id}`, refetchRoom);

    return () => {
      if (!router.query.id) {
        return;
      }

      unSubscribe(`newPlayer_${router.query.id}`, refetchRoom);
      unSubscribe(`startGame_${router.query.id}`, refetchRoom);
      unSubscribe(`winner_${router.query.id}`, refetchRoom);
    };
  }, [subscribe, unSubscribe, router]);

  if (loading) return <Loading />;
  if (error) return <Text> {`Error! ${error} `} </Text>;

  switch (data.game.status) {
    case 'New':
      return <NewGame room={data} user={user} />;
    case 'Playing':
      return <PlayingGame room={data} user={user} refetchRoom={refetch} />;
    case 'Finished':
      return <FinishedGame room={data} />;
  }
};

export default withAuth(Room);
