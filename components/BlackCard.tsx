import { Box, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';

import React from 'react';

const BlackCard = ({ card }) => (
  <VStack
    m={4}
    p={4}
    width="250px"
    height="250px"
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    backgroundColor="black"
    justifyContent="space-between"
    position="relative">
    <Box>
      <Text
        color="white"
        fontSize={
          card.description.length > 90
            ? 'lg'
            : card.description.length > 60
              ? 'xl'
              : '2xl'
        }>
        {card.description}
      </Text>
    </Box>
    {card.cardsToDraw > 1 && (
      <HStack justifyContent="flex-end" width="100%">
        <Text color="white">Cards to draw</Text>
        <Stack
          alignItems="center"
          justifyContent="center"
          backgroundColor="white"
          borderRadius="50%"
          width="30px"
          height="30px">
          <Text>{card.cardsToDraw}</Text>
        </Stack>
      </HStack>
    )}
    <Image
      src="/android-icon-192x192.png"
      position="absolute"
      bottom={4}
      left={4}
      width={10}
    />
  </VStack>
);

export default BlackCard;
