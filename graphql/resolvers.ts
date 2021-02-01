import {
  Player as PlayerType,
  Resolvers,
  Room as RoomType,
  User as UserType,
} from './types';

import Deck from 'data/deck';
import Player from 'data/player';
import Room from 'data/room';
import User from 'data/user';
import { sendMessage } from 'services/socket';

const shuffle = (array: Array<any>) => array.sort(() => Math.random() - 0.5);

const getRoom = async (id) =>
  await Room.findById(id)
    .populate({
      path: 'players',
      model: 'Player',
      populate: [
        {
          path: 'user',
          model: 'User',
        },
      ],
    })
    .populate({
      path: 'winners',
      model: 'Player',
      populate: [
        {
          path: 'user',
          model: 'User',
        },
      ],
    })
    .populate('owner');

const updateRoom = async (room) => {
  for (const player of room.players) {
    await player.save();
  }

  return await room.save();
};

const resolvers: Resolvers = {
  RootQuery: {
    user: async (_, { id }) => (await User.findById(id)) as UserType,
    player: async (_, { id }) =>
      (await Player.findById(id).populate('user')) as PlayerType,
    room: async (_, { id }) => (await getRoom(id)) as RoomType,
  },
  RootMutation: {
    createRoom: async (_, { roomData }) => {
      const deck = await Deck.findOne({ name: 'main', public: true });

      const room = new Room({
        name: roomData.name,
        callLink: roomData.callLink,
        game: {
          status: 'New',
          players: 0,
          activeBlackCard: {},
          cards: [...deck.cards],
          blackCards: [...deck.blackCards],
        },
        players: [],
        owner: await User.findById(roomData.userId),
      });

      const player = new Player({
        user: room.owner,
        cardCzar: false,
        cards: [],
        blackCards: [],
        selectedCards: [],
      });

      const createdPlayer = await player.save();

      room.players.push(createdPlayer);

      return (await room.save()) as RoomType;
    },
    createPlayer: async (_, { roomId, userId }) => {
      const room = await getRoom(roomId);

      const player = new Player({
        user: await User.findById(userId),
        cardCzar: false,
        cards: [],
        blackCards: [],
        selectedCards: [],
      });

      const createdPlayer = await player.save();

      room.players.push(createdPlayer);

      await room.save();

      await sendMessage(`newPlayer_${roomId}`, { player });

      return createdPlayer as PlayerType;
    },
    getOrCreateUser: async (_, { userData }) => {
      let user = await User.findOne({ sub: userData.sub });

      if (!user) {
        user = new User({
          nickname: userData.nickname,
          name: userData.name,
          picture: userData.picture,
          email: userData.email,
          sub: userData.sub,
        });

        await user.save();
      }

      return user as UserType;
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

      await sendMessage(`startGame_${roomId}`, { id: roomId });

      return (await updateRoom(room)) as RoomType;
    },
    nextRound: async (_, { roomId }) => {
      const room = await getRoom(roomId);

      const cards = shuffle([...room.game.cards]);
      const blackCards = shuffle([...room.game.blackCards]);

      const currentCzar = room.players.findIndex((p) => p.cardCzar);

      room.players.forEach((player) => {
        if (player.cards.length < 10) {
          player.cards = [
            ...player.cards,
            ...cards.splice(0, 10 - player.cards.length),
          ];
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
    updateSelectedCards: async (_, { roomId, userId, selected }) => {
      const room = await getRoom(roomId);

      const player = room.players.find((p) => p.user._id == userId);

      const cards = [...player.cards];
      let selectedCards = [];

      selected.forEach((id) => {
        const cardIndex = cards.findIndex((c) => c.id == id);
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

      return player as PlayerType;
    },
    updateWinner: async (_, { roomId, userId }) => {
      const room = await getRoom(roomId);
      const player = room.players.find((p) => p.user._id == userId);

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
    endGame: async (_, { roomId }) => {
      const room = await getRoom(roomId);
      room.game.cards = [];
      room.game.blackCards = [];
      room.game.activeBlackCard = null;
      room.game.status = 'Finished';

      room.players.forEach((player) => {
        player.cards = [];
        player.cardCzar = false;
      });

      const maxBlackCards = Math.max(
        ...room.players.map((p) => p.blackCards.length)
      );

      room.winners = room.players.filter(
        (p) => p.blackCards.length === maxBlackCards
      );

      await sendMessage(`endGame_${roomId}`, {});

      return (await updateRoom(room)) as RoomType;
    },
  },
};

export default resolvers;
