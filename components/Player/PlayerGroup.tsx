import { AvatarGroup } from '@chakra-ui/react';
import { Player } from 'graphql/types';
import PlayerAvatar from './PlayerAvatar';
import React from 'react';

const PlayerGroup: React.FC<{ players: Array<Player>; max?: number }> = ({
  players,
  max,
}) => (
  <AvatarGroup size="md" max={max || 3}>
    {players
      .filter((p) => !p.cardCzar)
      .sort((a, b) => a.blackCards.length - b.blackCards.length)
      .map((p) => (
        <PlayerAvatar key={p._id} player={p} showCardsCount />
      ))}
  </AvatarGroup>
);

export default PlayerGroup;
