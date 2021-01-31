import React, { useEffect } from 'react';

import { Text } from '@chakra-ui/react';
import createLoginUrl from 'lib/url-helper';
import { useRouter } from 'next/router';

const RedirectToLogin = () => {
  const router = useRouter();

  useEffect(() => {
    window.location.assign(createLoginUrl(router.pathname));
  }, [router]);

  return <Text>Signing you in...</Text>;
};

export default RedirectToLogin;
