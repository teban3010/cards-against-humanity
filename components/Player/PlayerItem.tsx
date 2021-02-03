import { HStack, Text } from '@chakra-ui/react';

import { Player } from 'graphql/types';
import PlayerAvatar from './PlayerAvatar';
import React from 'react';

const PlayerItem: React.FC<{
  player: Player;
  isAdmin?: boolean;
}> = ({ player, isAdmin = false, children }) => (
  <HStack>
    <PlayerAvatar player={player} />
    <Text>
      {player.user.nickname} {isAdmin && '(Admin)'}
    </Text>
    {children}
  </HStack>
);

export default PlayerItem;
