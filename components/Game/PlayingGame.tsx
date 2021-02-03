import { Card, Player, Room } from 'graphql/types';
import { Center, Container, HStack, Stack, VStack } from '@chakra-ui/react';
import React, { useEffect, useReducer } from 'react';
import { useEndGame, usePlayer, useUpdateSelectedCards } from 'hooks/useGraph';

import BlackCard from 'components/Cards/BlackCard';
import Button from 'components/common/Button';
import H1 from 'components/common/H1';
import H3 from 'components/common/H3';
import PlayerAvatar from 'components/Player/PlayerAvatar';
import PlayerGroup from 'components/Player/PlayerGroup';
import PlayerSelectedCardList from 'components/Cards/PlayerSelectedCardList';
import SelectedCardList from 'components/Cards/SelectedCardList';
import { UserProfile } from 'context/UserContext';
import WhiteCardList from 'components/Cards/WhiteCardList';

type State = {
  selectedCards: Array<Card>;
  isOwner: boolean;
  isCzar: boolean;
  czar: Player;
};

type Action =
  | {
      type: 'SET_ROOM_STATE';
      isOwner: boolean;
      isCzar: boolean;
      czar: Player;
    }
  | { type: 'SET_SELECTED_CARDS'; selectedCards: Array<Card> };

const initialState: State = {
  selectedCards: [],
  isOwner: false,
  isCzar: false,
  czar: undefined,
};

const SET_ROOM_STATE = 'SET_ROOM_STATE';
const SET_SELECTED_CARDS = 'SET_SELECTED_CARDS';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      return {
        ...state,
        isOwner: action.isOwner,
        isCzar: action.isCzar,
        czar: action.czar,
      };
    case SET_SELECTED_CARDS:
      return { ...state, selectedCards: action.selectedCards };
    default:
      return state;
  }
};

const PlayingGame: React.FC<{ room: Room; user: UserProfile }> = ({
  room,
  user,
}) => {
  const [updateSelectedCards] = useUpdateSelectedCards();
  const [endGame] = useEndGame();
  const { data: player } = usePlayer(
    room._id,
    room.players.find((p) => p.user?._id === user?._id)?._id
  );

  const [{ selectedCards, isOwner, isCzar, czar }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({
      type: SET_ROOM_STATE,
      isCzar: room.players.some((p) => p.cardCzar && p.user?._id === user?._id),
      czar: room.players.find((p) => p.cardCzar),
      isOwner: user._id === room.owner._id,
    });
  }, [room, user]);

  const onCardSelected = (card: Card) => {
    if (isCzar) {
      return;
    }

    if (selectedCards.some((c) => c.id === card.id)) {
      dispatch({
        type: SET_SELECTED_CARDS,
        selectedCards: [...selectedCards.filter((c) => c.id !== card.id)],
      });

      return;
    }

    if (room.game.activeBlackCard.cardsToDraw !== selectedCards.length) {
      dispatch({
        type: SET_SELECTED_CARDS,
        selectedCards: [...selectedCards, card],
      });
    } else {
      dispatch({ type: SET_SELECTED_CARDS, selectedCards: [card] });
    }
  };

  const onAcceptSelectedCards = () => {
    updateSelectedCards(
      room._id,
      user?._id,
      selectedCards.map((sc) => sc.id)
    );
    dispatch({ type: SET_SELECTED_CARDS, selectedCards: [] });
  };

  const onEndGame = () => {
    endGame(room._id);
  };

  return (
    <Container maxW="100%">
      <HStack justify="space-between" align="center" wrap="wrap" p={4}>
        <H1 color="white" m={0}>
          {room.name}
        </H1>
        {isOwner && <Button onClick={onEndGame}>End Game</Button>}
      </HStack>

      <Center>
        <VStack p={4}>
          <H3 color="white" marginBottom={1}>
            Current Czar
          </H3>
          {czar && <PlayerAvatar player={czar} />}
        </VStack>
        <VStack p={4}>
          <H3 color="white" marginBottom={1}>
            Players
          </H3>
          <PlayerGroup players={room.players} />
        </VStack>
      </Center>

      <Stack
        align={{ base: 'center', md: 'flex-start' }}
        direction={{ base: 'column', md: 'row' }}
        justify={
          room.players.some((p) => !p.cardCzar && p.selectedCards.length > 0)
            ? 'flex-start'
            : 'center'
        }
        width="100%"
        spacing={4}
        marginBlock={4}>
        {room.game.activeBlackCard && (
          <BlackCard card={room.game.activeBlackCard} />
        )}
        <PlayerSelectedCardList
          room={room}
          isCzar={isCzar}
          userId={user?._id}
        />
      </Stack>

      {!isCzar && selectedCards.length > 0 && (
        <SelectedCardList
          disabled={
            room.game.activeBlackCard.cardsToDraw !== selectedCards.length
          }
          onAccept={onAcceptSelectedCards}
          selectedCards={selectedCards}
          onCardSelected={onCardSelected}
        />
      )}

      {player && (
        <WhiteCardList
          cards={player.cards}
          selectedCards={player.selectedCards}
          isCzar={isCzar}
          onCardSelected={onCardSelected}
        />
      )}
    </Container>
  );
};

export default PlayingGame;
