import Button from 'components/common/Button';
import { Player } from 'graphql/types';
import PlayerItem from './PlayerItem';
import React from 'react';
import { Stack } from '@chakra-ui/react';

const PlayerList: React.FC<{
  players: Array<Player>;
  userId: string;
  isAdmin?: boolean;
  onStart?: () => void;
}> = ({ players, userId, isAdmin = false, onStart = () => {} }) => {
  return (
    <Stack direction="column">
      {players.map((p) => (
        <Stack
          key={p._id}
          w="100%"
          p={2}
          direction="row"
          borderRadius="md"
          justify="space-between"
          bgColor={p.user._id === userId ? 'aliceblue' : 'transparent'}>
          <PlayerItem player={p} isAdmin={isAdmin} />
          {isAdmin && (
            <Button onClick={onStart} disabled={players.length < 3}>
              Start
            </Button>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default PlayerList;
