import { Center, Heading, Text } from '@chakra-ui/react';

import Button from 'components/common/Button';
import Card from 'components/common/Card';
import PlayerItem from 'components/Player/PlayerItem';
import React from 'react';
import { Room } from 'graphql/types';
import { useRouter } from 'next/router';

const FinishedGame: React.FC<{ room: Room }> = ({ room }) => {
  const router = useRouter();

  return (
    <Center h="100%">
      <Card>
        <Center h="100%">
          <Heading>{room.name}</Heading>
        </Center>

        {room.winners.length === 1 ? (
          <Text>The winner is</Text>
        ) : (
          <Text>The winners are</Text>
        )}

        {room.winners.map((p) => (
          <PlayerItem key={p._id} player={p} />
        ))}

        <Button onClick={() => router.push('/')}>Back Home</Button>
      </Card>
    </Center>
  );
};

export default FinishedGame;
