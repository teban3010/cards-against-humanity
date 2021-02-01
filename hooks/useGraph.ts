import { Player, Room } from 'graphql/types';
import { QueryResult, gql, useMutation, useQuery } from '@apollo/client';

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
      winners {
        _id
        user {
          _id
          nickname
          name
          picture
          email
          sub
        }
        blackCards {
          id
          description
          cardsToDraw
        }
      }
    }
  }
`;

export interface RoomQuery extends QueryResult {
  data: Room;
}

export const useRoom = (id): RoomQuery => {
  const { data, ...queryResult } = useQuery(GET_ROOM, {
    variables: { id },
  });

  return { ...queryResult, data: data?.room };
};

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

export interface PlayerQuery extends QueryResult {
  data: Player;
}

export const usePlayer = (id): PlayerQuery => {
  const { data, ...queryResult } = useQuery(GET_PLAYER, {
    variables: { id },
  });

  return { ...queryResult, data: data?.player };
};

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

export const useGetOrCreateUser = (): [
  (
    nickname: string,
    name: string,
    picture: string,
    sub: string,
    email?: string
  ) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(GET_OR_CREATE_USER);

  const getOrCreateUser = (
    sub: string,
    nickname: string,
    name: string,
    picture: string,
    email?: string
  ) =>
    action({
      variables: { sub, nickname, name, picture, email },
    });

  return [getOrCreateUser, record];
};

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!, $callLink: String, $userId: ID!) {
    createRoom(
      roomData: { name: $name, callLink: $callLink, userId: $userId }
    ) {
      _id
    }
  }
`;

export const useCreateRoom = (): [
  (name: string, userId: string, callLink?: string) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(CREATE_ROOM);

  const createRoom = (name: string, userId: string, callLink?: string) =>
    action({
      variables: { name, userId, callLink },
    });

  return [createRoom, record];
};

const CREATE_PLAYER = gql`
  mutation CreatePlayer($roomId: ID!, $userId: ID!) {
    createPlayer(roomId: $roomId, userId: $userId) {
      _id
    }
  }
`;

export const useCreatePlayer = (): [
  (roomId: string, userId: string) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(CREATE_PLAYER);

  const createPlayer = (roomId: string, userId: string) =>
    action({
      variables: { roomId, userId },
    });

  return [createPlayer, record];
};

const START_GAME = gql`
  mutation StartGame($roomId: ID!) {
    startGame(roomId: $roomId) {
      _id
    }
  }
`;

export const useStartGame = (): [
  (roomId: string) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(START_GAME);

  const startGame = (roomId: string) =>
    action({
      variables: { roomId },
    });

  return [startGame, record];
};

const UPDATE_SELECTED_CARDS = gql`
  mutation updateSelectedCards(
    $roomId: ID!
    $userId: ID!
    $selected: [String!]!
  ) {
    updateSelectedCards(roomId: $roomId, userId: $userId, selected: $selected) {
      _id
    }
  }
`;

export const useUpdateSelectedCards = (): [
  (roomId: string, userId: string, selected: Array<string>) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(UPDATE_SELECTED_CARDS);

  const updateSelectedCards = (
    roomId: string,
    userId: string,
    selected: Array<string>
  ) =>
    action({
      variables: { roomId, userId, selected },
    });

  return [updateSelectedCards, record];
};

const UPDATE_WINNER = gql`
  mutation updateWinner($roomId: ID!, $userId: ID!) {
    updateWinner(roomId: $roomId, userId: $userId) {
      _id
    }
  }
`;

export const useUpdateWinner = (): [
  (roomId: string, userId: string) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(UPDATE_WINNER);

  const updateWinner = (roomId: string, userId: string) =>
    action({
      variables: { roomId, userId },
    });

  return [updateWinner, record];
};

const NEXT_ROUND = gql`
  mutation NextRound($roomId: ID!) {
    nextRound(roomId: $roomId) {
      _id
    }
  }
`;

export const useNextRound = (): [
  (roomId: string) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(NEXT_ROUND);

  const nextRound = (roomId: string) =>
    action({
      variables: { roomId },
    });

  return [nextRound, record];
};

const END_GAME = gql`
  mutation EndGame($roomId: ID!) {
    endGame(roomId: $roomId) {
      _id
    }
  }
`;

export const useEndGame = (): [
  (roomId: string) => Promise<any>,
  Record<string, any>
] => {
  const [action, record] = useMutation(END_GAME);

  const endGame = (roomId: string) =>
    action({
      variables: { roomId },
    });

  return [endGame, record];
};
