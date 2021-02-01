import CreateGame from 'components/CreateGame';
import Loading from 'components/Loading';
import Login from 'components/Login';
import React from 'react';
import useUser from 'hooks/useUser';

const Home = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  return user ? <CreateGame user={user} /> : <Login />;
};

export default Home;
