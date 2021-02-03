import { Avatar, AvatarBadge } from '@chakra-ui/react';

import { Player } from 'graphql/types';
import React from 'react';

const PlayerAvatar: React.FC<{ player: Player; showCardsCount?: boolean }> = ({
  player,
  showCardsCount,
}) => (
  <Avatar name={player.user.nickname} src={player.user.picture}>
    {showCardsCount && (
      <AvatarBadge boxSize="1.25em" bg="tomato">
        {player.blackCards.length}
      </AvatarBadge>
    )}
  </Avatar>
);

export default PlayerAvatar;
