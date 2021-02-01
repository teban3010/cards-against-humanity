import { Center, Circle, Image, VStack } from '@chakra-ui/react';

import Button from './UI/Button';
import Card from './UI/Card';
import H1 from './UI/H1';
import Logo from './Logo';
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
