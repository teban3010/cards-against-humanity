import Logo from '../common/Logo';
import React from 'react';
import { Stack } from '@chakra-ui/react';

const EmptyCard = () => (
  <Stack
    p={4}
    flex="0 0 250px"
    width="250px"
    height="250px"
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    bgColor="white"
    justify="center"
    align="center">
    <Logo maxW={20} />
  </Stack>
);

export default EmptyCard;
