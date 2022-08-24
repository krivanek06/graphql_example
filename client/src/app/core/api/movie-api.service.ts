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
	MovieInfoFragment,
	MovieInputCreate,
	MovieInputEdit,
	MovieSelectType,
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

	createMovie({ title, description }: MovieInputCreate): Observable<FetchResult<CreateMovieMutation>> {
		return this.createMovieGQL.mutate(
			{
				movieInputCreate: {
					title,
					description,
				},
			},
			{
				optimisticResponse: {
					createMovie: {
						__typename: 'Movie',
						id: -1,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						title: title,
						description: description,
						isSelected: MovieSelectType.Unselected,
					},
				},
				update: (store: DataProxy, { data }) => {
					const createdMovie = data?.createMovie as MovieInfoFragment;

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

	editMovie({ id, title, description }: MovieInputEdit): Observable<FetchResult<EditMovieMutation>> {
		return this.editMovieGQL.mutate({
			movieInputEdit: {
				id,
				title,
				description,
			},
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
