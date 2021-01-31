import { ApolloError, ApolloQueryResult, gql, useQuery } from '@apollo/client';

import { Room } from 'graphql/types';

const GET_ROOM = gql`
  query Room($id: ID!) {
    room(id: $id) {
      _id
      name
      callLink
      game {
        status
        activeBlackCard {
          id
          description
          cardsToDraw
        }
      }
      players {
        _id
        user {
          _id
          nickname
          name
          picture
          email
          sub
        }
        cardCzar
        selectedCards {
          id
          description
        }
        blackCards {
          id
          description
          cardsToDraw
        }
      }
      owner {
        _id
      }
    }
  }
`;

export interface RoomQuery {
  loading: boolean;
  error: ApolloError;
  data: Room;
  refetch: (variables?: Partial<any>) => Promise<ApolloQueryResult<Room>>;
}

const useRoom = (id): RoomQuery => {
  const { loading, error, data, refetch } = useQuery(GET_ROOM, {
    variables: { id },
  });

  return { loading, error, data: data?.room, refetch };
};

export default useRoom;
