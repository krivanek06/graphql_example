import { makeVar } from '@apollo/client/core';
import { MovieInfoFragment, MovieInputCreate } from 'src/app/graphql/graphql-custom-backend.service';

export const localMoviesReactiveVars = makeVar<MovieInfoFragment[]>([]);

export interface MovieForm {
	movieInputCreate: MovieInputCreate;
	persistOption: PersistOptionType;
}

export type PersistOptionType = 'Server' | 'LocalReactiveVariables' | 'LocalApolloCache';
