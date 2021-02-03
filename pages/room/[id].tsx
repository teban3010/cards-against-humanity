import { NextRouter, withRouter } from 'next/router';

import FinishedGame from 'components/Game/FinishedGame';
import Loading from 'components/common/Loading';
import NewGame from 'components/Game/NewGame';
import PlayingGame from 'components/Game/PlayingGame';
import React from 'react';
import { useRoom } from 'hooks/useGraph';
import useUser from 'hooks/useUser';
import withAuth from 'hoc/withAuth';

const Room: React.FC<{ router: NextRouter }> = ({ router }) => {
  const { loading: loadingUser, user } = useUser();
  const { loading, data: room } = useRoom(router.query.id);

  if (loading || loadingUser) {
    return <Loading />;
  }

  switch (room.game?.status) {
    case 'New':
      return <NewGame room={room} user={user} />;
    case 'Playing':
      return <PlayingGame room={room} user={user} />;
    case 'Finished':
      return <FinishedGame room={room} />;
    default:
      router.push('/');
  }
};

export default withAuth(withRouter(Room));
