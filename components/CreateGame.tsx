import React, { useEffect, useMemo } from 'react';

import Card from './common/Card';
import { Center } from '@chakra-ui/react';
import Field from './common/Field';
import Form from './common/Form';
import { FormField } from 'lib/FormField';
import H1 from './common/H1';
import H2 from './common/H2';
import Logo from './common/Logo';
import { useCreateRoom } from 'hooks/useGraph';
import { useRouter } from 'next/router';

const CreateGame = ({ user }) => {
  const router = useRouter();
  const [createRoom, { data }] = useCreateRoom();

  useEffect(() => {
    if (data?.createRoom) {
      router.push(`/room/${data.createRoom._id}`);
    }
  }, [data]);

  const formFields = useMemo(
    () => ({
      name: FormField.TextInput('name', 'Game Name', { required: true }),
      callLink: FormField.TextInput('callLink', 'Call Link', {
        helperText:
          'If you want, you can add a link to a call that will be displayed to all players',
      }),
      userId: FormField.TextInput('userId', 'UserId', {
        initialValue: user?._id,
      }),
    }),
    [user]
  );

  return (
    <Center height="100%">
      <Card>
        <Logo maxW={150} marginBottom={5} />

        <H2>Welcome {user.name}!</H2>
        <H1>Create a Game</H1>

        <Form
          submitAction={async (values) =>
            createRoom(values.name, values.userId, values.callLink)
          }
          valuesMapper={(values) => values}
          formFields={formFields}
          renderFields={() => (
            <>
              <Field {...formFields.name} />
              <Field {...formFields.callLink} />
            </>
          )}
        />
      </Card>
    </Center>
  );
};

export default CreateGame;
