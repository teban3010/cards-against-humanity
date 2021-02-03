import { Center, CircularProgress } from '@chakra-ui/react';

import React from 'react';

const Loading = () => (
  <Center h="100%">
    <CircularProgress color="white" isIndeterminate />
  </Center>
);

export default Loading;
