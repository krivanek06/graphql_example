import { Injectable } from '@angular/core';
import { DataProxy, FetchResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
	CreateMovieGQL,
	CreateMovieMutation,
	DeleteMovieGQL,
	DeleteMovieMutation,
	EditMovieGQL,
	EditMovieMutation,
	GetAllMoviesDocument,
	GetAllMoviesGQL,
	GetAllMoviesQuery,
	Movie,
	MovieInfoFragment,
	MovieInputCreate,
	MovieInputEdit,
} from './../../graphql/graphql-custom-backend.service';

@Injectable({
	providedIn: 'root',
})
export class MovieApiService {
	constructor(
		private getAllMoviesGQL: GetAllMoviesGQL,
		private createMovieGQL: CreateMovieGQL,
		private editMovieGQL: EditMovieGQL,
		private deleteMovieGQL: DeleteMovieGQL,
		private apollo: Apollo
	) {}

	getAllMovies(): Observable<MovieInfoFragment[]> {
		return this.getAllMoviesGQL.watch().valueChanges.pipe(
			map((res) => res.data.getAllMovies ?? []),
			map((movies) => movies.slice().reverse())
		);
	}

	createMovie(movieInputCreate: MovieInputCreate): Observable<FetchResult<CreateMovieMutation>> {
		return this.createMovieGQL.mutate(
			{
				movieInputCreate,
			},
			{
				optimisticResponse: {
					createMovie: {
						__typename: 'Movie',
						id: -1,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						title: movieInputCreate.title,
						description: movieInputCreate.description,
					},
				},
				update: (store: DataProxy, { data }) => {
					const createdMovie = data?.createMovie as Movie;

					// query movies from cache
					const moviesQuery = store.readQuery<GetAllMoviesQuery>({
						query: GetAllMoviesDocument,
					});

					// movies haven't been loaded yet - no data in cache
					if (!moviesQuery?.getAllMovies) {
						return;
					}

					// update cache
					store.writeQuery<GetAllMoviesQuery>({
						query: GetAllMoviesDocument,
						data: {
							__typename: 'Query',
							getAllMovies: [...moviesQuery.getAllMovies, createdMovie],
						},
					});
				},
			}
		);
	}

	editMovie(movieInputEdit: MovieInputEdit): Observable<FetchResult<EditMovieMutation>> {
		return this.editMovieGQL.mutate({
			movieInputEdit,
		});
	}

	deleteMovie(movieId: number): Observable<FetchResult<DeleteMovieMutation>> {
		return this.deleteMovieGQL.mutate(
			{
				movieId,
			},
			{
				update: (store: DataProxy, { data }) => {
					this.apollo.client.cache.evict({ id: `Movie:${data?.deleteMovie}` });
				},
			}
		);
	}
}
