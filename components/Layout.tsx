import {
  Avatar,
  Box,
  Circle,
  Container,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { GoPerson, GoSignIn, GoSignOut } from 'react-icons/go';

import Logo from './Logo';
import NextChakraLink from './UI/NextChakraLink';
import React from 'react';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';

const Layout: React.FC = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Container
      bgColor="black"
      w="100vW"
      maxW="100vw"
      h="100%"
      minH="100vh"
      p={0}
      m={0}>
      <HStack
        position="fixed"
        width="100%"
        h="64px"
        color="white"
        p={4}
        justify="space-between"
        boxShadow="0 1px 5px white"
        bgColor="black"
        zIndex={10}>
        <Logo maxWidth={10} />
        <HStack>
          <NextChakraLink href="/">Home</NextChakraLink>
          <NextChakraLink href="/howToPlay">How to Play</NextChakraLink>
        </HStack>
        <Menu>
          <MenuButton>
            {user ? <Avatar name={user.name} src={user.picture} /> : <Avatar />}
          </MenuButton>
          <MenuList color="black">
            {user ? (
              <>
                <MenuItem
                  icon={<GoPerson />}
                  onClick={() => router.push('/profile')}>
                  Profile
                </MenuItem>
                <MenuItem
                  icon={<GoSignOut />}
                  onClick={() => router.push('/api/logout')}>
                  Log out
                </MenuItem>
              </>
            ) : (
              <MenuItem
                icon={<GoSignIn />}
                onClick={() => router.push('/api/login')}>
                Log in
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </HStack>
      <Container maxW="100%" w="100%" h="100%" p={4} paddingTop="64px">
        {children}
      </Container>
    </Container>
  );
};

export default Layout;
