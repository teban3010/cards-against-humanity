import React, { ReactElement, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

export interface UserProfile {
  _id?: string;
  nickname?: string;
  name?: string;
  picture?: string;
  email?: string;
  sub?: string;
}

export interface UserContext {
  user?: UserProfile;
  loading: boolean;
}

// Use a global to save the user, so we don't have to fetch it again after page navigation
let userState: UserProfile;

export const User = React.createContext<UserContext>({
  user: null,
  loading: false,
});

export const fetchUser = async (): Promise<UserProfile> => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch('/api/me');
  return res.ok ? await res.json() : null;
};

type UserProviderProps = { children: React.ReactNode };

const GET_OR_CREATE_USER = gql`
  mutation GetOrCreateUser(
    $nickname: String!
    $name: String!
    $picture: String!
    $email: String
    $sub: String!
  ) {
    getOrCreateUser(
      userData: {
        nickname: $nickname
        name: $name
        picture: $picture
        email: $email
        sub: $sub
      }
    ) {
      _id
      nickname
      name
      picture
      email
      sub
    }
  }
`;

export const UserProvider = ({
  children,
}: UserProviderProps): ReactElement<UserContext> => {
  const [user, setUser] = useState(userState || null);
  const [loading, setLoading] = useState(userState === undefined);

  const [getOrCreateUser, { data }] = useMutation(GET_OR_CREATE_USER);

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser(user);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]);

  useEffect(() => {
    if (user) {
      getOrCreateUser({
        variables: {
          nickname: user.nickname,
          name: user.name,
          picture: user.picture,
          email: user.email,
          sub: user.sub,
        },
      });
    }

    setLoading(false);
  }, [user]);

  return (
    <User.Provider value={{ loading, user: data?.getOrCreateUser }}>
      {children}
    </User.Provider>
  );
};
