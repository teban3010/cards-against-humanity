import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!, $callLink: String, $userId: ID!) {
    createRoom(
      roomData: { name: $name, callLink: $callLink, userId: $userId }
    ) {
      _id
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const [createRoom, { data, error }] = useMutation(CREATE_ROOM);
  const [form, setForm] = useState({
    name: '',
    callLink: '',
  });

  useEffect(() => {
    if (data?.createRoom) {
      router.push(`/${data.createRoom._id}`);
    }
  }, [data]);

  if (loading) return <CircularProgress isIndeterminate />;

  return user ? (
    <Container>
      <Avatar name={user.name} src={user.picture} size="2xl" />
      <Heading>Welcome {user.name}! Create a Game</Heading>
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => {
          e.preventDefault();
          setForm((prevState) => ({ ...prevState, name: e.target.value }));
        }}
      />
      <Text>If you want, you can add a link to a call</Text>
      <Input
        placeholder="Call Link"
        value={form.callLink}
        onChange={(e) => {
          e.preventDefault();
          setForm((prevState) => ({ ...prevState, callLink: e.target.value }));
        }}
      />
      <Button
        onClick={() =>
          createRoom({
            variables: {
              name: form.name,
              callLink: form.callLink,
              userId: user._id,
            },
          })
        }>
        Create
      </Button>
    </Container>
  ) : (
    <Container>
      <Heading>Welcome</Heading>

      <Button onClick={() => router.push('/api/login')}>Log in</Button>
    </Container>
  );
};

export default Home;
