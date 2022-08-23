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
};

export type Movie = {
  __typename?: 'Movie';
  createdAt: Scalars['String'];
  /** User's description to the movie */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isSelected: MovieSelectType;
  movieComment: Array<MovieComment>;
  /** User's title to the movie */
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MovieComment = {
  __typename?: 'MovieComment';
  createdAt: Scalars['String'];
  /** Comment that was added */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  likedBy: Array<MovieCommentLike>;
  movieId: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
};

export type MovieCommentInput = {
  /** User's description */
  description: Scalars['String'];
  /** Movie which was commented */
  movieId: Scalars['Float'];
  /** User who wrote the comment */
  userId: Scalars['Float'];
};

export type MovieCommentLike = {
  __typename?: 'MovieCommentLike';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  movieComment: MovieComment;
  /** Comment that was liked */
  movieCommentId: Scalars['Int'];
  user: User;
  /** User who liked the comment */
  userId: Scalars['Int'];
};

export type MovieInputCreate = {
  /** User's description to the movie */
  description?: InputMaybe<Scalars['String']>;
  /** User's title to the movie */
  title: Scalars['String'];
};

export type MovieInputEdit = {
  /** User's description to the movie */
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  /** User's title to the movie */
  title: Scalars['String'];
};

export enum MovieSelectType {
  Unselected = 'UNSELECTED',
  IsSelected = 'isSelected'
}

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  createMovieComment: MovieComment;
  deleteMovie: Scalars['Float'];
  editMovie: Movie;
};


export type MutationCreateMovieArgs = {
  movieInputCreate: MovieInputCreate;
};


export type MutationCreateMovieCommentArgs = {
  movieCommentInput: MovieCommentInput;
};


export type MutationDeleteMovieArgs = {
  movieId: Scalars['Int'];
};


export type MutationEditMovieArgs = {
  movieInputEdit: MovieInputEdit;
};

export type Query = {
  __typename?: 'Query';
  getAllLocalMovies: Array<Movie>;
  getAllLocalMoviesReactiveVars: Array<Movie>;
  /** we return multiple movies */
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

export type Subscription = {
  __typename?: 'Subscription';
  createdMovie: Movie;
  deletedMovie: Scalars['Float'];
  editedMovie: Movie;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  /** Description to user's usernaem */
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  movieCommentsUserLeft: Array<MovieComment>;
  movieCommentsUserLiked: Array<MovieCommentLike>;
  username: Scalars['String'];
};

export type GetAllLocalMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocalMoviesQuery = { __typename?: 'Query', getAllLocalMovies: Array<{ __typename?: 'Movie', id: number, createdAt: string, updatedAt: string, title: string, description?: string | null, isSelected: MovieSelectType }> };

export type GetAllLocalMoviesReactiveVarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocalMoviesReactiveVarsQuery = { __typename?: 'Query', getAllLocalMoviesReactiveVars: Array<{ __typename?: 'Movie', id: number, createdAt: string, updatedAt: string, title: string, description?: string | null, isSelected: MovieSelectType }> };

export type MovieInfoFragment = { __typename?: 'Movie', id: number, createdAt: string, updatedAt: string, title: string, description?: string | null, isSelected: MovieSelectType };

export type GetAllMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMoviesQuery = { __typename?: 'Query', getAllMovies: Array<{ __typename?: 'Movie', id: number, createdAt: string, updatedAt: string, title: string, description?: string | null, isSelected: MovieSelectType }> };

export type CreateMovieMutationVariables = Exact<{
  movieInputCreate: MovieInputCreate;
}>;


export type CreateMovieMutation = { __typename?: 'Mutation', createMovie: { __typename?: 'Movie', id: number, createdAt: string, updatedAt: string, title: string, description?: string | null, isSelected: MovieSelectType } };

export type EditMovieMutationVariables = Exact<{
  movieInputEdit: MovieInputEdit;
}>;


export type EditMovieMutation = { __typename?: 'Mutation', editMovie: { __typename?: 'Movie', id: number, createdAt: string, updatedAt: string, title: string, description?: string | null, isSelected: MovieSelectType } };

export type DeleteMovieMutationVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie: number };

export const MovieInfoFragmentDoc = gql`
    fragment MovieInfo on Movie {
  id
  createdAt
  updatedAt
  title
  description
  isSelected @client
}
    `;
export const GetAllLocalMoviesDocument = gql`
    query GetAllLocalMovies {
  getAllLocalMovies @client {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllLocalMoviesGQL extends Apollo.Query<GetAllLocalMoviesQuery, GetAllLocalMoviesQueryVariables> {
    override document = GetAllLocalMoviesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllLocalMoviesReactiveVarsDocument = gql`
    query GetAllLocalMoviesReactiveVars {
  getAllLocalMoviesReactiveVars @client {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllLocalMoviesReactiveVarsGQL extends Apollo.Query<GetAllLocalMoviesReactiveVarsQuery, GetAllLocalMoviesReactiveVarsQueryVariables> {
    override document = GetAllLocalMoviesReactiveVarsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllMoviesDocument = gql`
    query GetAllMovies {
  getAllMovies {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllMoviesGQL extends Apollo.Query<GetAllMoviesQuery, GetAllMoviesQueryVariables> {
    override document = GetAllMoviesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateMovieDocument = gql`
    mutation CreateMovie($movieInputCreate: MovieInputCreate!) {
  createMovie(movieInputCreate: $movieInputCreate) {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMovieGQL extends Apollo.Mutation<CreateMovieMutation, CreateMovieMutationVariables> {
    override document = CreateMovieDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditMovieDocument = gql`
    mutation EditMovie($movieInputEdit: MovieInputEdit!) {
  editMovie(movieInputEdit: $movieInputEdit) {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EditMovieGQL extends Apollo.Mutation<EditMovieMutation, EditMovieMutationVariables> {
    override document = EditMovieDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteMovieDocument = gql`
    mutation DeleteMovie($movieId: Int!) {
  deleteMovie(movieId: $movieId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteMovieGQL extends Apollo.Mutation<DeleteMovieMutation, DeleteMovieMutationVariables> {
    override document = DeleteMovieDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }