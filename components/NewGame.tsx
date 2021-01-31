import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Room } from 'graphql/types';
import { UserProfile } from 'context/UserContext';

const CREATE_PLAYER = gql`
  mutation CreatePlayer($roomId: ID!, $userId: ID!) {
    createPlayer(roomId: $roomId, userId: $userId) {
      _id
    }
  }
`;

const START_GAME = gql`
  mutation StartGame($roomId: ID!) {
    startGame(roomId: $roomId) {
      _id
    }
  }
`;

export interface NewGameProps {
  room: Room;
  user: UserProfile;
}

const NewGame: React.FC<NewGameProps> = ({ room, user }) => {
  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [startGame] = useMutation(START_GAME);

  return (
    <Container p={5}>
      <HStack justify="space-between" align="center">
        <Heading>{room.name}</Heading>
        {user._id === room.owner._id && (
          <Button
            onClick={() => startGame({ variables: { roomId: room._id } })}>
            Start Game
          </Button>
        )}
      </HStack>

      {!room.players.some((p) => p.user._id === user._id) && (
        <Button
          onClick={() =>
            createPlayer({ variables: { roomId: room._id, userId: user._id } })
          }>
          Join game
        </Button>
      )}

      <Text>Current players</Text>

      {room.players.map((p) => (
        <HStack
          key={p._id}
          p={1}
          bgColor={p.user._id === user._id ? 'aliceblue' : 'transparent'}>
          <Avatar name={p.user.name} src={p.user.picture} />
          <Text>{p.user.name}</Text>
          {p.user._id === room.owner._id && <Text>(Admin)</Text>}
        </HStack>
      ))}
    </Container>
  );
};

export default NewGame;
