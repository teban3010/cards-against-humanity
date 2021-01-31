import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Card, Player, Room } from 'graphql/types';
import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import BlackCard from 'components/BlackCard';
import EmptyCard from './EmptyCard';
import { SocketContext } from 'context/SocketContext';
import { UserProfile } from 'context/UserContext';
import WhiteCard from 'components/WhiteCard';
import usePlayer from 'hooks/usePlayer';

const UPDATE_SELECTED_CARDS = gql`
  mutation updateSelectedCards(
    $roomId: ID!
    $userId: ID!
    $selected: [String!]!
  ) {
    updateSelectedCards(
      roomId: $roomId
      userId: $userId
      selected: $selected
    ) {
      _id
    }
  }
`;

const UPDATE_WINNER = gql`
  mutation updateWinner($roomId: ID!, $userId: ID!) {
    updateWinner(roomId: $roomId, userId: $userId) {
      _id
    }
  }
`;

const NEXT_ROUND = gql`
  mutation NextRound($roomId: ID!) {
    nextRound(roomId: $roomId) {
      _id
    }
  }
`;

const END_GAME = gql`
  mutation EndGame($roomId: ID!) {
    endGame(roomId: $roomId) {
      _id
    }
  }
`;

export interface PlayingGameProps {
  room: Room;
  user: UserProfile;
}

const PlayingGame: React.FC<PlayingGameProps> = ({ room, user }) => {
  const [updateSelectedCards] = useMutation(UPDATE_SELECTED_CARDS);
  const [updateWinner] = useMutation(UPDATE_WINNER);
  const [nextRound] = useMutation(NEXT_ROUND);
  const [endGame] = useMutation(END_GAME);
  const { data: player, refetch } = usePlayer(
    room.players.find((p) => p.user._id === user?._id)?._id
  );
  const { subscribe, unSubscribe } = useContext(SocketContext);

  useEffect(() => {
    const refetchPlayer = () => refetch();

    subscribe(`updateSelectedCards_${room._id}`, refetchPlayer);

    return () => {
      unSubscribe(`updateSelectedCards_${room._id}`, refetchPlayer);
    };
  }, [subscribe, unSubscribe, room]);

  const [showCards, setShowCards] = useState(false);
  const [isCzar, setIsCzar] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Array<Card>>([]);
  const [revealedPlayers, setRevealedPlayers] = useState<Array<Player>>([]);

  const [roundWinner, setRoundWinner] = useState<Player | undefined>();

  useEffect(() => {
    setShowCards(
      room.players.filter((p) => p.selectedCards.length > 0).length ===
        room.players.length - 1
    );

    setIsCzar(room.players.some((p) => p.cardCzar && p.user._id === user._id));
    setRoundComplete(
      room.players.some((p) =>
        p.blackCards.some((bc) => bc.id === room.game.activeBlackCard.id)
      )
    );
  }, [room, user]);

  const onCardSelected = (card: Card) => {
    if (isCzar) {
      return;
    }

    if (selectedCards.some((c) => c.id === card.id)) {
      setSelectedCards((prevState) => [
        ...prevState.filter((c) => c.id !== card.id),
      ]);

      return;
    }

    if (room.game.activeBlackCard.cardsToDraw !== selectedCards.length) {
      setSelectedCards((prevState) => [...prevState, card]);
    } else {
      setSelectedCards([card]);
    }
  };

  const onPlayerSelected = (p: Player) => {
    if (!isCzar) {
      return;
    }

    if (revealedPlayers.length !== room.players.length - 1) {
      setRevealedPlayers((prevState) => [...prevState, p]);
      return;
    }

    if (!roundWinner || roundWinner._id !== p._id) {
      setRoundWinner(p);
    } else {
      setRoundWinner(undefined);
    }
  };

  const showPlayerCards = (p: Player) =>
    (showCards &&
      ((isCzar && revealedPlayers.some((rp) => rp._id === p._id)) ||
        !isCzar)) ||
    roundComplete;

  const playerSelectedStyles = {
    borderWidth: '2px',
    borderColor: 'blue.500',
    borderRadius: 'md',
    bgColor: 'blue.100',
  };

  return (
    <Container maxW="95%" p={10}>
      <HStack justify="space-between" align="center">
        <Heading>{room.name}</Heading>
        {user._id === room.owner._id && (
          <Button onClick={() => endGame({ variables: { roomId: room._id } })}>
            End Game
          </Button>
        )}
      </HStack>

      <Text>Players</Text>

      <HStack p={1}>
        {room.players.map((p: Player) => (
          <Box key={p._id}>
            <Avatar name={p.user.name} src={p.user.picture}>
              <AvatarBadge boxSize="1.25em" bg="tomato">
                {p.blackCards.length}
              </AvatarBadge>
            </Avatar>
          </Box>
        ))}
      </HStack>

      <Text>
        Current Czar: {room.players.find((p: Player) => p.cardCzar).user.name}
      </Text>

      <HStack align="flex-start">
        {room.game.activeBlackCard && (
          <BlackCard card={room.game.activeBlackCard} />
        )}

        <VStack justify="center">
          <HStack overflowY="auto">
            {room.players
              .filter((p) => !p.cardCzar)
              .map((p) => (
                <VStack
                  key={p._id}
                  p={1}
                  {...(isCzar ? { cursor: 'pointer' } : {})}
                  {...(roundWinner && roundWinner._id === p._id
                    ? playerSelectedStyles
                    : {})}
                  onClick={() => onPlayerSelected(p)}>
                  {p.selectedCards.map((c) =>
                    showPlayerCards(p) ? (
                      <WhiteCard key={c.id} card={c} />
                    ) : (
                      <EmptyCard />
                    )
                  )}
                  {roundComplete && (
                    <Avatar name={p.user.name} src={p.user.picture} />
                  )}
                </VStack>
              ))}
          </HStack>
          {isCzar && showCards && !roundComplete && (
            <Button
              disabled={!roundWinner}
              onClick={() =>
                updateWinner({
                  variables: {
                    roomId: room._id,
                    userId: roundWinner.user._id,
                  },
                })
              }>
              Accept Round Winner
            </Button>
          )}
          {isCzar && showCards && roundComplete && (
            <Button
              onClick={() =>
                nextRound({
                  variables: { roomId: room._id },
                })
              }>
              Next Round
            </Button>
          )}
        </VStack>
      </HStack>

      {!isCzar && selectedCards.length > 0 && (
        <Box>
          <HStack>
            <Text>Selected cards</Text>
            <Button
              disabled={
                room.game.activeBlackCard.cardsToDraw !== selectedCards.length
              }
              onClick={() =>
                updateSelectedCards({
                  variables: {
                    roomId: room._id,
                    userId: user._id,
                    selected: selectedCards.map((sc) => sc.id),
                  },
                })
              }>
              Accept selection
            </Button>
          </HStack>
          <HStack overflowY="auto">
            {selectedCards.map((c, idx) => (
              <WhiteCard key={c.id} card={c} selectedOrder={idx + 1} />
            ))}
          </HStack>
        </Box>
      )}

      {player && (
        <Box position="relative">
          <HStack overflowY="auto">
            {player.cards.map((c: Card) => (
              <WhiteCard
                key={c.id}
                card={c}
                selected={selectedCards.some((sc) => sc.id === c.id)}
                onSelected={() => onCardSelected(c)}
                selectedOrder={
                  selectedCards.findIndex((sc) => sc.id === c.id) + 1
                }
              />
            ))}
          </HStack>
          {(isCzar || player.selectedCards.length > 0) && (
            <Box
              position="absolute"
              zIndex={10}
              width="100%"
              height="100%"
              bgColor="gray.500"
              opacity="0.2"
              top={0}
              left={0}></Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default PlayingGame;
