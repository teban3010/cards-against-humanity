import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Container,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { Card, Player, Room } from 'graphql/types';
import React, { useContext, useEffect, useState } from 'react';
import {
  useEndGame,
  useNextRound,
  usePlayer,
  useUpdateSelectedCards,
  useUpdateWinner,
} from 'hooks/useGraph';

import BlackCard from 'components/Cards/BlackCard';
import Button from 'components/UI/Button';
import EmptyCard from '../Cards/EmptyCard';
import H1 from 'components/UI/H1';
import H3 from 'components/UI/H3';
import PlayerAvatar from 'components/PlayerAvatar';
import { SocketContext } from 'context/SocketContext';
import { UserProfile } from 'context/UserContext';
import WhiteCard from 'components/Cards/WhiteCard';

export interface PlayingGameProps {
  room: Room;
  user: UserProfile;
  refetchRoom: Function;
}

const PlayingGame: React.FC<PlayingGameProps> = ({
  room,
  user,
  refetchRoom,
}) => {
  const [updateSelectedCards] = useUpdateSelectedCards();
  const [updateWinner] = useUpdateWinner();
  const [nextRound] = useNextRound();
  const [endGame] = useEndGame();
  const { data: player, refetch } = usePlayer(
    room.players.find((p) => p.user._id === user?._id)?._id
  );
  const { subscribe, unSubscribe } = useContext(SocketContext);

  useEffect(() => {
    const refetchPlayer = () => {
      refetch();
      refetchRoom();
    };

    subscribe(`updateSelectedCards_${room._id}`, refetchPlayer);

    return () => {
      unSubscribe(`updateSelectedCards_${room._id}`, refetchPlayer);
    };
  }, [subscribe, unSubscribe, room]);

  const [showCards, setShowCards] = useState(false);
  const [isCzar, setIsCzar] = useState(false);
  const [czar, setCzar] = useState<Player | undefined>();
  const [roundComplete, setRoundComplete] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Array<Card>>([]);
  const [revealedPlayers, setRevealedPlayers] = useState<Array<Player>>([]);
  const [isOwner, setIsOwner] = useState(false);

  const [roundWinner, setRoundWinner] = useState<Player | undefined>();

  useEffect(() => {
    setShowCards(
      room.players.filter((p) => p.selectedCards.length > 0).length ===
        room.players.length - 1
    );

    setIsCzar(room.players.some((p) => p.cardCzar && p.user._id === user._id));
    setCzar(room.players.find((p) => p.cardCzar));
    setRoundComplete(
      room.players.some((p) =>
        p.blackCards.some((bc) => bc.id === room.game.activeBlackCard.id)
      )
    );

    setIsOwner(user?._id === room.owner._id);
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
        (!isCzar && p.user._id === user._id))) ||
    roundComplete;

  const playerSelectedStyles = {
    borderWidth: '2px',
    borderColor: 'blue.500',
    borderRadius: 'md',
    bgColor: 'blue.100',
  };

  return (
    <Container maxW="100%">
      <HStack justify="space-between" align="center" wrap="wrap" p={4}>
        <H1 color="white" m={0}>
          {room.name}
        </H1>
        {isOwner && <Button onClick={() => endGame(room._id)}>End Game</Button>}
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
          <AvatarGroup size="md" max={3}>
            {room.players
              .filter((p) => !p.cardCzar)
              .sort((a, b) => a.blackCards.length - b.blackCards.length)
              .map((p) => (
                <PlayerAvatar key={p._id} player={p} />
              ))}
          </AvatarGroup>
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
        <VStack justify="center" overflowY="auto">
          <HStack flex="1">
            {room.players
              .filter((p) => !p.cardCzar)
              .map((p) => (
                <VStack
                  key={p._id}
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
              onClick={() => updateWinner(room._id, roundWinner.user._id)}>
              Accept Round Winner
            </Button>
          )}
          {isCzar && showCards && roundComplete && (
            <Button onClick={() => nextRound(room._id)}>Next Round</Button>
          )}
        </VStack>
      </Stack>

      {!isCzar && selectedCards.length > 0 && (
        <HStack
          wrap="wrap"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          shadow="md">
          <VStack justify="center" align="center" m={4} p={4}>
            <H3 color="white">Selected cards</H3>
            <Button
              disabled={
                room.game.activeBlackCard.cardsToDraw !== selectedCards.length
              }
              onClick={() => {
                updateSelectedCards(
                  room._id,
                  user._id,
                  selectedCards.map((sc) => sc.id)
                );
                setSelectedCards([]);
              }}>
              Accept selection
            </Button>
          </VStack>
          {selectedCards.map((c, idx) => (
            <WhiteCard
              key={c.id}
              card={c}
              selectedOrder={idx + 1}
              onSelected={() => onCardSelected(c)}
            />
          ))}
        </HStack>
      )}

      {player && (
        <Box position="relative" marginBlock={4}>
          <HStack overflowY="auto" paddingBlock={4}>
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
              zchIndex={10}
              w="100%"
              h="100%"
              bgColor="gray.500"
              borderRadius="md"
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
