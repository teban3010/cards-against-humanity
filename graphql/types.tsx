import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  id: Scalars['String'];
  description: Scalars['String'];
};

export type BlackCard = {
  id: Scalars['String'];
  description: Scalars['String'];
  cardsToDraw: Scalars['Int'];
};

export type Deck = {
  _id: Scalars['String'];
  name: Scalars['String'];
  language: Scalars['String'];
  createdBy?: Maybe<User>;
  public: Scalars['Boolean'];
  cards?: Maybe<Array<Card>>;
  blackCards?: Maybe<Array<BlackCard>>;
};

export type User = {
  _id: Scalars['ID'];
  nickname: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  sub: Scalars['String'];
};

export type Player = {
  _id: Scalars['ID'];
  user: User;
  cardCzar: Scalars['Boolean'];
  selectedCards?: Maybe<Array<Card>>;
  cards?: Maybe<Array<Card>>;
  blackCards?: Maybe<Array<BlackCard>>;
};

export type Game = {
  status: Scalars['String'];
  activeBlackCard?: Maybe<BlackCard>;
  cards?: Maybe<Array<Card>>;
  blackCards?: Maybe<Array<BlackCard>>;
};

export type Room = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  callLink?: Maybe<Scalars['String']>;
  game: Game;
  players: Array<Player>;
  owner: User;
  winners?: Maybe<Array<Maybe<Player>>>;
};

export type UserData = {
  nickname: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  sub: Scalars['String'];
};

export type RoomData = {
  name: Scalars['String'];
  callLink?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type RootQuery = {
  user: User;
  player: Player;
  room: Room;
};

export type RootQueryUserArgs = {
  id: Scalars['ID'];
};

export type RootQueryPlayerArgs = {
  id: Scalars['ID'];
};

export type RootQueryRoomArgs = {
  id: Scalars['ID'];
};

export type RootMutation = {
  createRoom: Room;
  createPlayer: Player;
  getOrCreateUser: User;
  startGame: Room;
  nextRound: Room;
  updateSelectedCards: Player;
  updateWinner: Room;
  endGame: Room;
};

export type RootMutationCreateRoomArgs = {
  roomData?: Maybe<RoomData>;
};

export type RootMutationCreatePlayerArgs = {
  roomId?: Maybe<Scalars['ID']>;
  userId: Scalars['ID'];
};

export type RootMutationGetOrCreateUserArgs = {
  userData: UserData;
};

export type RootMutationStartGameArgs = {
  roomId: Scalars['ID'];
};

export type RootMutationNextRoundArgs = {
  roomId: Scalars['ID'];
};

export type RootMutationUpdateSelectedCardsArgs = {
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
  selected: Array<Scalars['String']>;
};

export type RootMutationUpdateWinnerArgs = {
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RootMutationEndGameArgs = {
  roomId: Scalars['ID'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Card: ResolverTypeWrapper<Card>;
  String: ResolverTypeWrapper<Scalars['String']>;
  BlackCard: ResolverTypeWrapper<BlackCard>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Deck: ResolverTypeWrapper<Deck>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Player: ResolverTypeWrapper<Player>;
  Game: ResolverTypeWrapper<Game>;
  Room: ResolverTypeWrapper<Room>;
  UserData: UserData;
  RoomData: RoomData;
  RootQuery: ResolverTypeWrapper<{}>;
  RootMutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Card: Card;
  String: Scalars['String'];
  BlackCard: BlackCard;
  Int: Scalars['Int'];
  Deck: Deck;
  Boolean: Scalars['Boolean'];
  User: User;
  ID: Scalars['ID'];
  Player: Player;
  Game: Game;
  Room: Room;
  UserData: UserData;
  RoomData: RoomData;
  RootQuery: {};
  RootMutation: {};
};

export type CardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlackCardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BlackCard'] = ResolversParentTypes['BlackCard']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cardsToDraw?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']
> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  cards?: Resolver<
    Maybe<Array<ResolversTypes['Card']>>,
    ParentType,
    ContextType
  >;
  blackCards?: Resolver<
    Maybe<Array<ResolversTypes['BlackCard']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sub?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  cardCzar?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedCards?: Resolver<
    Maybe<Array<ResolversTypes['Card']>>,
    ParentType,
    ContextType
  >;
  cards?: Resolver<
    Maybe<Array<ResolversTypes['Card']>>,
    ParentType,
    ContextType
  >;
  blackCards?: Resolver<
    Maybe<Array<ResolversTypes['BlackCard']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']
> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activeBlackCard?: Resolver<
    Maybe<ResolversTypes['BlackCard']>,
    ParentType,
    ContextType
  >;
  cards?: Resolver<
    Maybe<Array<ResolversTypes['Card']>>,
    ParentType,
    ContextType
  >;
  blackCards?: Resolver<
    Maybe<Array<ResolversTypes['BlackCard']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  callLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  winners?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Player']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RootQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']
> = {
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<RootQueryUserArgs, 'id'>
  >;
  player?: Resolver<
    ResolversTypes['Player'],
    ParentType,
    ContextType,
    RequireFields<RootQueryPlayerArgs, 'id'>
  >;
  room?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootQueryRoomArgs, 'id'>
  >;
};

export type RootMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RootMutation'] = ResolversParentTypes['RootMutation']
> = {
  createRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootMutationCreateRoomArgs, never>
  >;
  createPlayer?: Resolver<
    ResolversTypes['Player'],
    ParentType,
    ContextType,
    RequireFields<RootMutationCreatePlayerArgs, 'userId'>
  >;
  getOrCreateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<RootMutationGetOrCreateUserArgs, 'userData'>
  >;
  startGame?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootMutationStartGameArgs, 'roomId'>
  >;
  nextRound?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootMutationNextRoundArgs, 'roomId'>
  >;
  updateSelectedCards?: Resolver<
    ResolversTypes['Player'],
    ParentType,
    ContextType,
    RequireFields<
      RootMutationUpdateSelectedCardsArgs,
      'roomId' | 'userId' | 'selected'
    >
  >;
  updateWinner?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootMutationUpdateWinnerArgs, 'roomId' | 'userId'>
  >;
  endGame?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootMutationEndGameArgs, 'roomId'>
  >;
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>;
  BlackCard?: BlackCardResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RootQuery?: RootQueryResolvers<ContextType>;
  RootMutation?: RootMutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
