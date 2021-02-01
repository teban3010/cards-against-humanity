import { Avatar, Center, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useCreatePlayer, useStartGame } from 'hooks/useGraph';

import Button from '../UI/Button';
import Card from 'components/UI/Card';
import H1 from 'components/UI/H1';
import H3 from 'components/UI/H3';
import { Room } from 'graphql/types';
import { UserProfile } from 'context/UserContext';

export interface NewGameProps {
  room: Room;
  user: UserProfile;
}

const NewGame: React.FC<NewGameProps> = ({ room, user }) => {
  const [createPlayer] = useCreatePlayer();
  const [startGame] = useStartGame();

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(user?._id === room.owner._id);
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

        {!room.players.some((p) => p.user._id === user?._id) && (
          <Button onClick={() => createPlayer(room._id, user._id)}>
            Join game
          </Button>
        )}

        {room.players.map((p) => (
          <HStack
            key={p._id}
            w="100%"
            p={2}
            borderRadius="md"
            justify="space-between"
            bgColor={p.user._id === user?._id ? 'aliceblue' : 'transparent'}>
            <HStack>
              <Avatar name={p.user.nickname} src={p.user.picture} />
              <Text>
                {p.user.nickname} {isOwner && '(Admin)'}
              </Text>
            </HStack>
            {isOwner && (
              <Button
                onClick={() => startGame(room._id)}
                disabled={room.players.length < 3}>
                Start
              </Button>
            )}
          </HStack>
        ))}
      </Card>
    </Center>
  );
};

export default NewGame;
