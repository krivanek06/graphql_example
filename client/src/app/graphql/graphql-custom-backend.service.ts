import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Movie = {
  __typename?: 'Movie';
  createdAt: Scalars['DateTime'];
  /** User's description to the movie */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  movieComment: Array<MovieComment>;
  /** User's title to the movie */
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MovieComment = {
  __typename?: 'MovieComment';
  createdAt: Scalars['DateTime'];
  /** Comment that was added */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  likedBy: Array<MovieCommentLike>;
  movieId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type MovieCommentLike = {
  __typename?: 'MovieCommentLike';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  movieComment: MovieComment;
  /** Comment that was liked */
  movieCommentId: Scalars['Int'];
  user: User;
  /** User who liked the comment */
  userId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getAllMovies: Array<Movie>;
  getAllUsers: Array<User>;
  getMovieById: Movie;
  getUserById: User;
  healthCheck: Scalars['String'];
};


export type QueryGetMovieByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  /** Description to user's usernaem */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  movieCommentsUserLeft: Array<MovieComment>;
  movieCommentsUserLiked: Array<MovieCommentLike>;
  username: Scalars['String'];
};

export type MovieFragment = { __typename?: 'Movie', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null };

export type GetAllMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMoviesQuery = { __typename?: 'Query', getAllMovies: Array<{ __typename?: 'Movie', id: number, createdAt: any, updatedAt: any, title: string, description?: string | null }> };

export const MovieFragmentDoc = gql`
    fragment Movie on Movie {
  id
  createdAt
  updatedAt
  title
  description
}
    `;
export const GetAllMoviesDocument = gql`
    query GetAllMovies {
  getAllMovies {
    ...Movie
  }
}
    ${MovieFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllMoviesGQL extends Apollo.Query<GetAllMoviesQuery, GetAllMoviesQueryVariables> {
    override document = GetAllMoviesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }