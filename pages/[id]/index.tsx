import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  HStack,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';

import FinishedGame from 'components/FinishedGame';
import NewGame from 'components/NewGame';
import PlayingGame from 'components/PlayingGame';
import { SocketContext } from 'context/SocketContext';
import usePlayer from 'hooks/usePlayer';
import useRoom from 'hooks/useRoom';
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
    subscribe(`nextRound_${router.query.id}`, refetchRoom);
    subscribe(`updateSelectedCards_${router.query.id}`, refetchRoom);
    subscribe(`winner_${router.query.id}`, refetchRoom);

    return () => {
      if (!router.query.id) {
        return;
      }

      unSubscribe(`newPlayer_${router.query.id}`, refetchRoom);
      unSubscribe(`startGame_${router.query.id}`, refetchRoom);
      unSubscribe(`nextRound_${router.query.id}`, refetchRoom);
      unSubscribe(`updateSelectedCards_${router.query.id}`, refetchRoom);
      unSubscribe(`winner_${router.query.id}`, refetchRoom);
    };
  }, [subscribe, unSubscribe, router]);

  if (loading) return <CircularProgress isIndeterminate />;
  if (error) return <Text> {`Error! ${error} `} </Text>;

  switch (data.game.status) {
    case 'New':
      return <NewGame room={data} user={user} />;
    case 'Playing':
      return <PlayingGame room={data} user={user} />;
    case 'Finished':
      return <FinishedGame room={data} />;
  }
};

export default withAuth(Room);
