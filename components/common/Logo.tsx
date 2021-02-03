import { Circle, Image, SquareProps } from '@chakra-ui/react';

import React from 'react';

const Logo: React.FC<SquareProps> = (props) => (
  <Circle bg="blue.200" {...props}>
    <Image src="/android-icon-192x192.png" />
  </Circle>
);

export default Logo;
