import EmptyCard from './EmptyCard';
import { Player } from 'graphql/types';
import PlayerAvatar from 'components/Player/PlayerAvatar';
import React from 'react';
import { Stack } from '@chakra-ui/react';
import WhiteCard from './WhiteCard';

const PlayerSelectedCard: React.FC<{
  player: Player;
  selected: boolean;
  onSelected: (p: Player) => void;
  showCards: boolean;
  isCzar: boolean;
  revealed: boolean;
  roundComplete: boolean;
}> = ({
  player,
  selected,
  onSelected,
  showCards,
  isCzar,
  revealed,
  roundComplete,
}) => (
  <Stack
    key={player._id}
    direction="column"
    onClick={() => onSelected(player)}
    cursor={isCzar && showCards ? 'pointer' : 'cursor'}
    borderWidth={selected ? '2px' : null}
    borderColor={selected ? 'blue.500' : null}
    bgColor={selected ? 'blue.100' : null}
    borderRadius="md">
    {player.selectedCards.map((c) =>
      (showCards && revealed) || roundComplete ? (
        <WhiteCard key={c.id} card={c} />
      ) : (
        <EmptyCard key={c.id} />
      )
    )}
    {roundComplete && <PlayerAvatar player={player} showCardsCount />}
  </Stack>
);

export default PlayerSelectedCard;
