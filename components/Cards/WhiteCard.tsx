import { Box, Stack, Text } from '@chakra-ui/react';

import { Card } from 'graphql/types';
import Logo from '../common/Logo';
import React from 'react';

export interface WhiteCardProps {
  card: Card;
  selected?: boolean;
  onSelected?: () => void;
  selectedOrder?: number;
}

const WhiteCard: React.FC<WhiteCardProps> = ({
  card,
  selected,
  onSelected,
  selectedOrder,
}) => (
  <Box
    p={4}
    flex="0 0 250px"
    w="250px"
    height="250px"
    shadow="md"
    borderWidth={selected ? '2px' : '1px'}
    borderColor={selected ? 'blue.500' : '#E2E8F0'}
    bgColor={selected ? 'blue.100' : 'white'}
    borderRadius="md"
    position="relative"
    cursor={!!onSelected ? 'pointer' : 'cursor'}
    onClick={onSelected}>
    {selectedOrder > 0 && (
      <Stack
        justify="center"
        align="center"
        position="absolute"
        top={1}
        right={1}
        bgColor={'blue.500'}
        width={6}
        height={6}
        borderRadius="50%">
        <Text color="white" fontWeight="bold">
          {selectedOrder}
        </Text>
      </Stack>
    )}
    <Text fontSize={card.description.length > 60 ? 'xl' : '2xl'}>
      {card.description}
    </Text>
    <Logo position="absolute" bottom={4} left={4} maxW={10} />
  </Box>
);

export default WhiteCard;
