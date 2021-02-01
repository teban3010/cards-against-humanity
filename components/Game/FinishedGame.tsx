import { Avatar, Center, HStack, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Button from 'components/UI/Button';
import Card from 'components/UI/Card';
import { Room } from 'graphql/types';
import { useRouter } from 'next/router';

export interface FinishedGameProps {
  room: Room;
}

const FinishedGame: React.FC<FinishedGameProps> = ({ room }) => {
  const router = useRouter();
  console.log(room);
  return (
    <Center h="100%">
      <Card>
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
            <Avatar name={p.user.nickname} src={p.user.picture} />
            <Text>{p.user.nickname}</Text>
          </HStack>
        ))}

        <Button onClick={() => router.push('/')}>Back Home</Button>
      </Card>
    </Center>
  );
};

export default FinishedGame;
