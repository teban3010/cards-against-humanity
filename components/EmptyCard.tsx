import { Box, Image, Stack, Text } from '@chakra-ui/react';

import { Card } from 'graphql/types';
import React from 'react';

const EmptyCard = () => (
  <Stack
    p={4}
    flex="0 0 250px"
    width="250px"
    height="250px"
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    justify="center"
    align="center">
    <Image src="/android-icon-192x192.png" width={20} />
  </Stack>
);

export default EmptyCard;
