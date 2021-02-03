import Button from 'components/common/Button';
import { Card } from 'graphql/types';
import H3 from 'components/common/H3';
import React from 'react';
import { Stack } from '@chakra-ui/react';
import WhiteCardList from './WhiteCardList';

const SelectedCardList: React.FC<{
  selectedCards?: Array<Card>;
  onCardSelected: (selectedCard: Card) => void;
  onAccept: () => void;
  disabled: boolean;
}> = ({ selectedCards, onCardSelected, onAccept, disabled }) => (
  <Stack
    wrap="wrap"
    p={4}
    borderWidth="1px"
    borderRadius="md"
    shadow="md"
    direction="row">
    <Stack justify="center" align="center" m={4} p={4} direction="column">
      <H3 color="white">Selected cards</H3>
      <Button disabled={disabled} onClick={onAccept}>
        Accept selection
      </Button>
    </Stack>
    <WhiteCardList
      cards={selectedCards}
      selectedCards={selectedCards}
      onCardSelected={onCardSelected}
    />
  </Stack>
);

export default SelectedCardList;
