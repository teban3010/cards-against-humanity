import Deck, { BlackCard, Card } from 'data/deck';

import { connectDB } from 'data/database';
import csv from 'csvtojson';
import { v4 as uuidv4 } from 'uuid';

const createDeck = async (req, res) => {
  try {
    connectDB();

    const deck = new Deck({
      name: 'main',
      language: 'es-AR',
      public: true,
      cards: [],
      blackCards: [],
    });

    // await deck.save();

    (await csv().fromFile('CAH - cards.csv')).forEach((c) => {
      deck.cards.push({
        id: uuidv4(),
        description: c.description,
      });
    });

    // await deck.save();

    (await csv().fromFile('CAH - black cards.csv')).forEach((c) => {
      deck.blackCards.push({
        id: uuidv4(),
        description: c.description,
        cardsToDraw: c.cardsToDraw,
      });
    });

    await deck.save();

    res.status(200).end('success');
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default createDeck;
