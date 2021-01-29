import { Player as PlayerType, Resolvers, Room as RoomType } from './types';
import Room, { IRoom } from 'data/room';

import BlackCard from 'data/blackCard';
import Card from 'data/card';
import Player from 'data/player';
import { sendMessage } from 'services/socket';

const shuffle = (array: Array<any>) => array.sort(() => Math.random() - 0.5);

const getRoom = async (id) =>
  await Room.findById(id)
    .populate({
      path: 'game.cards',
      model: 'Card',
    })
    .populate({
      path: 'game.blackCards',
      model: 'BlackCard',
    })
    .populate({
      path: 'game.activeBlackCard',
      model: 'BlackCard',
    })
    .populate({
      path: 'players',
      model: 'Player',
      populate: [
        {
          path: 'cards',
          model: 'Card',
        },
        {
          path: 'selectedCards',
          model: 'Card',
        },
        {
          path: 'blackCards',
          model: 'BlackCard',
        },
      ],
    });

const updateRoom = async (room: IRoom) => {
  for (const player of room.players) {
    await player.save();
  }

  return await room.save();
};

const resolvers: Resolvers = {
  RootQuery: {
    player: async (_, { id }) =>
      (await Player.findById(id)
        .populate('cards')
        .populate('blackCards')
        .populate('selectedCards')) as PlayerType,
    room: async (_, { id }) => (await getRoom(id)) as RoomType,
  },
  RootMutation: {
    createRoom: async (_, { roomData }) => {
      const room = new Room({
        name: roomData.name,
        callLink: roomData.callLink,
        game: {
          mode: roomData.mode,
          status: 'New',
          players: 0,
          cards: await Card.find(),
          blackCards: await BlackCard.find(),
        },
        players: [],
      });

      return (await room.save()) as RoomType;
    },
    createPlayer: async (_, { roomId, name }) => {
      const room = await getRoom(roomId);

      const player = new Player({
        name: name,
        cardCzar: false,
        cards: [],
        blackCards: [],
        selectedCards: [],
      });

      const createdPlayer = await player.save();

      room.players.push(createdPlayer);

      await room.save();

      await sendMessage(`newPlayer_${roomId}`, { name });

      return createdPlayer as PlayerType;
    },
    startGame: async (_, { roomId }) => {
      const room = await getRoom(roomId);

      const cards = shuffle([...room.game.cards]);
      const blackCards = shuffle([...room.game.blackCards]);
      room.players.forEach((player) => {
        player.cards = cards.splice(0, 10);
      });

      const cardCzarIdx = Math.floor((room.players.length - 1) * Math.random());
      room.players[cardCzarIdx].cardCzar = true;

      room.game.cards = cards;
      room.game.activeBlackCard = blackCards.splice(0, 1)[0];
      room.game.blackCards = blackCards;
      room.game.status = 'Playing';

      await sendMessage(`startGame_${roomId}`, {});

      return (await updateRoom(room)) as RoomType;
    },
    nextRound: async (_, { roomId }) => {
      const room = await getRoom(roomId);

      const cards = shuffle([...room.game.cards]);
      const blackCards = shuffle([...room.game.blackCards]);

      const currentCzar = room.players.findIndex((p) => p.cardCzar);

      room.players.forEach((player) => {
        if (player.cards.length < 10) {
          player.cards = cards.splice(0, 10 - player.cards.length);
        }

        player.selectedCards = [];

        player.cardCzar = false;
      });

      if (currentCzar === room.players.length - 1) {
        room.players[0].cardCzar = true;
      } else {
        room.players[currentCzar + 1].cardCzar = true;
      }

      room.game.cards = cards;
      room.game.activeBlackCard = blackCards.splice(0, 1)[0];
      room.game.blackCards = blackCards;

      await sendMessage(`nextRound_${roomId}`, {});

      return (await updateRoom(room)) as RoomType;
    },
    updateSelectedCards: async (_, { roomId, playerId, selected }) => {
      const room = await getRoom(roomId);

      const player = room.players.find((p) => p._id == playerId);

      const cards = [...player.cards];
      let selectedCards = [];

      selected.forEach((id) => {
        const cardIndex = cards.findIndex((c) => c._id == id);
        if (cardIndex > -1) {
          selectedCards = [...selectedCards, ...cards.splice(cardIndex, 1)];
        }
      });

      player.cards = cards;
      player.selectedCards = selectedCards;

      await updateRoom(room);

      await sendMessage(`updateSelectedCards_${roomId}`, {
        playerId: player._id,
      });

      return player;
    },
    updateWinner: async (_, { roomId, playerId }) => {
      const room = await getRoom(roomId);
      const player = room.players.find((p) => p._id == playerId);

      player.blackCards.push(room.game.activeBlackCard);

      await sendMessage(`winner_${roomId}`, {
        player: {
          _id: player._id,
          name: player.name,
          blackCards: player.blackCards,
        },
      });

      return (await updateRoom(room)) as RoomType;
    },
  },
};

export default resolvers;
