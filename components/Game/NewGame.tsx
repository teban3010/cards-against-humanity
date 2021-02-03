import { Center, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useCreatePlayer, useStartGame } from 'hooks/useGraph';

import Button from '../common/Button';
import Card from 'components/common/Card';
import H1 from 'components/common/H1';
import H3 from 'components/common/H3';
import PlayerList from 'components/Player/PlayerList';
import { Room } from 'graphql/types';
import { UserProfile } from 'context/UserContext';

const NewGame: React.FC<{ room: Room; user: UserProfile }> = ({
  room,
  user,
}) => {
  const [isOwner, setIsOwner] = useState(false);

  const [createPlayer] = useCreatePlayer();
  const [startGame] = useStartGame();

  useEffect(() => {
    setIsOwner(user._id === room.owner._id);
  }, [room, user]);

  return (
    <Center marginTop={5}>
      <Card align="flex-start">
        <H1>{room.name}</H1>

        <H3>Players</H3>

        {isOwner && room.players.length < 3 && (
          <Text marginBottom={5}>
            At least 3 players are needed to start the game
          </Text>
        )}

        {!room.players.some((p) => p.user._id === user._id) && (
          <Button onClick={() => createPlayer(room._id, user._id)}>
            Join game
          </Button>
        )}

        <PlayerList
          players={room.players}
          userId={user?._id}
          isAdmin={isOwner}
          onStart={() => startGame(room._id)}
        />
      </Card>
    </Center>
  );
};

export default NewGame;
