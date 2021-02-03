import { Player, Room } from 'graphql/types';
import React, { useEffect, useReducer } from 'react';
import { useNextRound, useUpdateWinner } from 'hooks/useGraph';

import Button from 'components/common/Button';
import PlayerSelectedCard from './PlayerSelectedCard';
import { Stack } from '@chakra-ui/react';

type State = {
  roundComplete: boolean;
  revealedPlayers: Array<Player>;
  roundWinner?: Player;
  showCards: boolean;
  players: Array<Player>;
};

type Action =
  | {
      type: 'SET_ROOM_STATE';
      showCards: boolean;
      players: Array<Player>;
      roundComplete: boolean;
    }
  | { type: 'SET_REVEALED_PLAYER'; revealedPlayers: Array<Player> }
  | { type: 'SET_ROUND_WINNER'; roundWinner?: Player };

const initialState: State = {
  roundComplete: false,
  revealedPlayers: [],
  roundWinner: undefined,
  showCards: false,
  players: [],
};

const SET_ROOM_STATE = 'SET_ROOM_STATE';
const SET_REVEALED_PLAYER = 'SET_REVEALED_PLAYER';
const SET_ROUND_WINNER = 'SET_ROUND_WINNER';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ROOM_STATE:
      return {
        ...state,
        showCards: action.showCards,
        players: action.players,
        roundComplete: action.roundComplete,
      };
    case SET_REVEALED_PLAYER:
      return { ...state, revealedPlayers: action.revealedPlayers };
    case SET_ROUND_WINNER:
      return { ...state, roundWinner: action.roundWinner };
    default:
      return state;
  }
};

const PlayerSelectedCardList: React.FC<{
  room: Room;
  isCzar: boolean;
  userId: string;
}> = ({ room, isCzar, userId }) => {
  const [
    { roundComplete, revealedPlayers, roundWinner, showCards, players },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [updateWinner] = useUpdateWinner();
  const [nextRound] = useNextRound();

  useEffect(() => {
    const players = room.players.filter((p) => !p.cardCzar);

    dispatch({
      type: SET_ROOM_STATE,
      players: players.sort(() => Math.random() - 0.5),
      showCards:
        players.length ===
        players.filter((p) => p.selectedCards.length > 0).length,
      roundComplete: room.players.some((p) =>
        p.blackCards.some((bc) => bc.id === room.game.activeBlackCard.id)
      ),
    });
  }, [room]);

  const onUpdateWinner = () => {
    updateWinner(room._id, roundWinner.user?._id);
    dispatch({ type: SET_ROUND_WINNER, roundWinner: undefined });
  };

  const onNextRound = () => {
    nextRound(room._id);
    dispatch({
      type: SET_REVEALED_PLAYER,
      revealedPlayers: [],
    });
  };

  const onRevealPlayer = (p: Player) => {
    if (!isCzar || !showCards) {
      return;
    }

    if (revealedPlayers.length !== room.players.length - 1) {
      dispatch({
        type: SET_REVEALED_PLAYER,
        revealedPlayers: [...revealedPlayers, p],
      });

      return;
    }

    if (!roundWinner || roundWinner._id !== p._id) {
      dispatch({ type: SET_ROUND_WINNER, roundWinner: p });
    } else {
      dispatch({ type: SET_ROUND_WINNER, roundWinner: undefined });
    }
  };

  return (
    <Stack direction="column" justify="center" overflowY="auto">
      <Stack direction="row" flex="1">
        {players.map((p) => (
          <PlayerSelectedCard
            key={p._id}
            player={p}
            selected={roundWinner && roundWinner._id === p._id}
            onSelected={onRevealPlayer}
            showCards={showCards}
            isCzar={isCzar}
            revealed={
              (isCzar && revealedPlayers.some((rp) => rp._id === p._id)) ||
              (!isCzar && p.user?._id === userId)
            }
            roundComplete={roundComplete}
          />
        ))}
      </Stack>
      {isCzar && showCards ? (
        roundComplete ? (
          <Button onClick={onNextRound}>Next Round</Button>
        ) : (
          <Button disabled={!roundWinner} onClick={onUpdateWinner}>
            Accept Round Winner
          </Button>
        )
      ) : null}
    </Stack>
  );
};

export default PlayerSelectedCardList;
