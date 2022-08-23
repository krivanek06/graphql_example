import { makeVar } from '@apollo/client/core';
import { MovieInfoFragment } from 'src/app/graphql/graphql-custom-backend.service';

export const localMoviesReactiveVars = makeVar<MovieInfoFragment[]>([]);
