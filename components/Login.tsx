import { Center, Circle, Image, VStack } from '@chakra-ui/react';

import Button from './common/Button';
import Card from './common/Card';
import H1 from './common/H1';
import Logo from './common/Logo';
import React from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  return (
    <Center height="100%">
      <Card>
        <Logo maxWidth={150} />
        <H1>Welcome</H1>
        <Button onClick={() => router.push('/api/login')}>Log in</Button>
      </Card>
    </Center>
  );
};

export default Login;
