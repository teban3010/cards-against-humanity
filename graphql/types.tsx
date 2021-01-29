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
  _id: Scalars['ID'];
  description: Scalars['String'];
  language: Scalars['String'];
  deck: Scalars['String'];
};

export type BlackCard = {
  _id: Scalars['ID'];
  description: Scalars['String'];
  cardsToDraw: Scalars['Int'];
  language: Scalars['String'];
  deck: Scalars['String'];
};

export type Player = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  cardCzar: Scalars['Boolean'];
  selectedCards?: Maybe<Array<Card>>;
  cards?: Maybe<Array<Card>>;
  blackCards?: Maybe<Array<BlackCard>>;
};

export type Game = {
  mode: Scalars['String'];
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
};

export type RoomData = {
  name: Scalars['String'];
  callLink?: Maybe<Scalars['String']>;
  mode: Scalars['String'];
};

export type RootQuery = {
  player: Player;
  room: Room;
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
  startGame: Room;
  nextRound: Room;
  updateSelectedCards: Player;
  updateWinner: Room;
};

export type RootMutationCreateRoomArgs = {
  roomData?: Maybe<RoomData>;
};

export type RootMutationCreatePlayerArgs = {
  roomId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type RootMutationStartGameArgs = {
  roomId: Scalars['ID'];
};

export type RootMutationNextRoundArgs = {
  roomId: Scalars['ID'];
};

export type RootMutationUpdateSelectedCardsArgs = {
  roomId: Scalars['ID'];
  playerId: Scalars['ID'];
  selected: Array<Scalars['ID']>;
};

export type RootMutationUpdateWinnerArgs = {
  roomId: Scalars['ID'];
  playerId: Scalars['ID'];
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
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  BlackCard: ResolverTypeWrapper<BlackCard>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Player: ResolverTypeWrapper<Player>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Game: ResolverTypeWrapper<Game>;
  Room: ResolverTypeWrapper<Room>;
  RoomData: RoomData;
  RootQuery: ResolverTypeWrapper<{}>;
  RootMutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Card: Card;
  ID: Scalars['ID'];
  String: Scalars['String'];
  BlackCard: BlackCard;
  Int: Scalars['Int'];
  Player: Player;
  Boolean: Scalars['Boolean'];
  Game: Game;
  Room: Room;
  RoomData: RoomData;
  RootQuery: {};
  RootMutation: {};
};

export type CardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlackCardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BlackCard'] = ResolversParentTypes['BlackCard']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cardsToDraw?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  mode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RootQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']
> = {
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
    RequireFields<RootMutationCreatePlayerArgs, never>
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
      'roomId' | 'playerId' | 'selected'
    >
  >;
  updateWinner?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<RootMutationUpdateWinnerArgs, 'roomId' | 'playerId'>
  >;
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>;
  BlackCard?: BlackCardResolvers<ContextType>;
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
