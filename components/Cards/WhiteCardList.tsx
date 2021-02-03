import { Box, Stack } from '@chakra-ui/react';

import { Card } from 'graphql/types';
import React from 'react';
import WhiteCard from 'components/Cards/WhiteCard';

const WhiteCardList: React.FC<{
  isCzar?: boolean;
  cards: Array<Card>;
  selectedCards?: Array<Card>;
  onCardSelected: (selectedCard: Card) => void;
}> = ({ isCzar = false, cards, selectedCards = [], onCardSelected }) => (
  <Box position="relative" marginBlock={4}>
    <Stack direction="row" overflowY="auto" paddingBlock={4}>
      {cards.map((c: Card) => (
        <WhiteCard
          key={c.id}
          card={c}
          selected={
            selectedCards.length > 0
              ? selectedCards.some((sc) => sc.id === c.id)
              : false
          }
          onSelected={() => onCardSelected(c)}
          selectedOrder={selectedCards.findIndex((sc) => sc.id === c.id) + 1}
        />
      ))}
    </Stack>
    {(isCzar || selectedCards.length > 0) && (
      <Box
        position="absolute"
        zIndex={10}
        w="100%"
        h="100%"
        bgColor="gray.500"
        borderRadius="md"
        opacity="0.2"
        top={0}
        left={0}
      />
    )}
  </Box>
);

export default WhiteCardList;
