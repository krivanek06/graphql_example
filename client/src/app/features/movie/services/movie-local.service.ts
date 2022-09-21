import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
	GetAllLocalMoviesQuery,
	MovieInfoFragment,
	MovieInfoFragmentDoc,
	MovieInputCreate,
	MovieInputEdit,
	MovieSelectType,
} from 'src/app/graphql/graphql-custom-backend.service';
import { localMoviesReactiveVars } from '../models/movie.model';
import {
	GetAllLocalMoviesDocument,
	GetAllLocalMoviesGQL,
	GetAllLocalMoviesReactiveVarsGQL,
} from './../../../graphql/graphql-custom-backend.service';

@Injectable({
	providedIn: 'root',
})
export class MovieLocalService {
	constructor(
		private getAllLocalMoviesReactiveVarsGQL: GetAllLocalMoviesReactiveVarsGQL,
		private getAllLocalMoviesGQL: GetAllLocalMoviesGQL,
		private apollo: Apollo
	) {}

	/* Methods to manage Movie in reactive variables */
	get allLocalMoviesReactiveVars(): MovieInfoFragment[] {
		return localMoviesReactiveVars();
	}
	getAllLocalMoviesReactiveVars(): Observable<MovieInfoFragment[]> {
		// return of(localMoviesReactiveVars()); // <-- this doesn't work, not reactive
		return this.getAllLocalMoviesReactiveVarsGQL.watch().valueChanges.pipe(map((res) => res.data.getAllLocalMoviesReactiveVars));
	}

	onMovieAddToReactiveVariables(movieInputCreate: MovieInputCreate): void {
		const movie = this.createMovieInfoFromMovieCreate(movieInputCreate);
		localMoviesReactiveVars([movie, ...localMoviesReactiveVars()]);
	}

	onMovieEditToReactiveVariables({ id, title, description }: MovieInputEdit): void {
		// find index of the edited movie
		const editedMovieIndex = localMoviesReactiveVars().findIndex((movie) => movie.id === id);

		// get the edited movie by index
		const editedMovie = localMoviesReactiveVars()[editedMovieIndex];

		// create new array where we replace the old movie title & description
		const editedArray = Object.assign([], localMoviesReactiveVars(), {
			[editedMovieIndex]: {
				...editedMovie,
				title,
				description,
				updatedAt: new Date().toISOString(),
			},
		});

		// save whole array of movies into reactive vars
		localMoviesReactiveVars(editedArray);
	}

	onMovieDeleteToReactiveVariables(movieId: number): void {
		const filteredOutMovies = localMoviesReactiveVars().filter((movie) => movie.id !== movieId);
		localMoviesReactiveVars(filteredOutMovies);
	}

	/* --------------------------------------- */
	/* --------------------------------------- */
	/* --------------------------------------- */

	/* Methods to manage Movie in Apollo cache */
	getAllLocalMovies(): Observable<MovieInfoFragment[]> {
		return this.getAllLocalMoviesGQL.watch().valueChanges.pipe(map((res) => res.data.getAllLocalMovies));
	}
	onMovieAddToApolloCache(movieInputCreate: MovieInputCreate): void {
		const movie = this.createMovieInfoFromMovieCreate(movieInputCreate);
		this.apollo.client.cache.writeQuery({
			query: GetAllLocalMoviesDocument,
			data: {
				__typename: 'Query',
				getAllLocalMovies: movie,
			},
		});
	}

	onMovieEditToApolloCache({ id, title, description }: MovieInputEdit): void {
		// load movies from cache
		const getAllLocalMovies = this.getAllLocalMoviesFromCache();

		// find index of the edited movie
		const editedMovieIndex = getAllLocalMovies.findIndex((movie) => movie.id === id);

		// editedMovieIndex can be 0, so check only for undefined
		if (editedMovieIndex !== undefined) {
			// get the edited movie by index
			const editedMovie = getAllLocalMovies[editedMovieIndex];

			// create new array where we replace the old movie title & description
			const editedArray = Object.assign([], getAllLocalMovies, {
				[editedMovieIndex]: {
					...editedMovie,
					title,
					description,
					updatedAt: new Date().toISOString(),
				},
			});

			// update cache with rest of the movies
			this.updateGetAllLocalMoviesQuery(editedArray);
		}
	}

	onMovieDeleteToApolloCache(movieId: number): void {
		// load movies from cache
		const getAllLocalMovies = this.getAllLocalMoviesFromCache();

		// filter out which id don't match
		const cachedMoviesFiltered = getAllLocalMovies.filter((movie) => movie.id !== movieId);

		// update cache with rest of the movies
		this.updateGetAllLocalMoviesQuery(cachedMoviesFiltered);
	}

	onToggleSelectMovie(movie: MovieInfoFragment, isSelected: boolean): void {
		// These two are the same

		// this.apollo.client.cache.updateFragment<MovieInfoFragment>(
		// 	{
		// 		fragment: MovieInfoFragmentDoc,
		// 	},
		// 	() => ({
		// 		__typename: 'Movie',
		// 		id: movie.id,
		// 		title: movie.title,
		// 		createdAt: movie.createdAt,
		// 		description: movie.description,
		// 		updatedAt: new Date().toISOString(),
		// 		isSelected: isSelected ? MovieSelectType.Selected : MovieSelectType.Unselected,
		// 	})
		// );

		this.apollo.client.writeFragment<MovieInfoFragment>({
			id: `${movie.__typename}:${movie.id}`,
			fragment: MovieInfoFragmentDoc,
			fragmentName: 'MovieInfo',
			data: {
				...movie,
				isSelected: isSelected ? MovieSelectType.Selected : MovieSelectType.Unselected,
				updatedAt: new Date().toISOString(),
			},
		});
	}

	/* --------------------------------------- */
	/* --------------------------------------- */
	/* --------------------------------------- */

	/* Helper methods */
	private createMovieInfoFromMovieCreate({ title, description }: MovieInputCreate): MovieInfoFragment {
		const rightNow = new Date();
		const movie: MovieInfoFragment = {
			__typename: 'Movie',
			id: rightNow.getTime(), // fake ID
			title,
			description,
			createdAt: rightNow.toISOString(),
			updatedAt: rightNow.toISOString(),
			movieCommentCount: 0,
			isSelected: MovieSelectType.Unselected,
		};
		return movie;
	}

	/* Helpers for getAllLocalMovies Query */
	private getAllLocalMoviesFromCache(): MovieInfoFragment[] {
		const cachedMovieDocument = this.apollo.client.cache.readQuery<GetAllLocalMoviesQuery>({
			query: GetAllLocalMoviesDocument,
		});
		const getAllLocalMovies = cachedMovieDocument?.getAllLocalMovies ?? [];
		return getAllLocalMovies;
	}

	private updateGetAllLocalMoviesQuery(movie: MovieInfoFragment | MovieInfoFragment[] | undefined): void {
		this.apollo.client.cache.writeQuery({
			query: GetAllLocalMoviesDocument,
			data: {
				__typename: 'Query',
				getAllLocalMovies: movie ?? [],
			},
		});
	}
}
