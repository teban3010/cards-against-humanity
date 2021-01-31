import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { Room } from 'graphql/types';
import { UserProfile } from 'context/UserContext';
import { useRouter } from 'next/router';

export interface FinishedGameProps {
  room: Room;
}

const FinishedGame: React.FC<FinishedGameProps> = ({ room }) => {
  const router = useRouter();

  return (
    <Container p={5}>
      <HStack justify="space-between" align="center">
        <Heading>{room.name}</Heading>
      </HStack>

      {room.winners.length === 1 ? (
        <Text>The winner is</Text>
      ) : (
        <Text>The winners are</Text>
      )}

      {room.winners.map((p) => (
        <HStack key={p._id} p={1}>
          <Avatar name={p.user.name} src={p.user.picture} />
          <Text>{p.user.name}</Text>
          {p.user._id === room.owner._id && <Text>(Admin)</Text>}
        </HStack>
      ))}

      <Button onClick={() => router.push('/')}>Back Home</Button>
    </Container>
  );
};

export default FinishedGame;
