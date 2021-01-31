import { ApolloError, ApolloQueryResult, gql, useQuery } from '@apollo/client';

import { Player } from 'graphql/types';

const GET_PLAYER = gql`
  query Player($id: ID!) {
    player(id: $id) {
      _id
      selectedCards {
        id
        description
      }
      cards {
        id
        description
      }
      blackCards {
        id
        description
        cardsToDraw
      }
    }
  }
`;

export interface PlayerQuery {
  loading: boolean;
  error: ApolloError;
  data: Player;
  refetch: (variables?: Partial<any>) => Promise<ApolloQueryResult<Player>>;
}

const useRoom = (id): PlayerQuery => {
  const { loading, error, data, refetch } = useQuery(GET_PLAYER, {
    variables: { id },
  });

  return { loading, error, data: data?.player, refetch };
};

export default useRoom;
