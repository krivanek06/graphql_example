import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MovieApiService } from 'src/app/core/api/movie-api.service';
import { MovieInfoFragment, MovieInputCreate, MovieInputEdit } from 'src/app/graphql/graphql-custom-backend.service';
import { MovieLocalService } from '../../services/movie-local.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
	moviesFromServer$!: Observable<MovieInfoFragment[]>;
	moviesFromReactiveVariables$!: Observable<MovieInfoFragment[]>;
	moviesFromApolloCache$!: Observable<MovieInfoFragment[]>;
	constructor(private movieApiService: MovieApiService, private movieLocalService: MovieLocalService) {}

	ngOnInit(): void {
		this.moviesFromServer$ = this.movieApiService.getAllMovies();
		this.moviesFromReactiveVariables$ = this.movieLocalService.getAllLocalMoviesReactiveVars();
		this.moviesFromApolloCache$ = this.movieLocalService.getAllLocalMovies();
	}

	/* Methods to manage Movie on backend */
	async onMovieAddToServer(movieInputCreate: MovieInputCreate): Promise<void> {
		await firstValueFrom(this.movieApiService.createMovie(movieInputCreate));
	}

	async onEditMovieToServer(movieInputEdit: MovieInputEdit): Promise<void> {
		await firstValueFrom(this.movieApiService.editMovie(movieInputEdit));
	}

	async onMovieDeleteToServer(movieId: number): Promise<void> {
		await firstValueFrom(this.movieApiService.deleteMovie(movieId));
	}

	/* Methods to manage Movie in reactive variables */
	onMovieAddToReactiveVariables(movieInputCreate: MovieInputCreate): void {
		this.movieLocalService.onMovieAddToReactiveVariables(movieInputCreate);
	}

	onMovieEditToReactiveVariables(movieInputEdit: MovieInputEdit): void {
		this.movieLocalService.onMovieEditToReactiveVariables(movieInputEdit);
	}

	onMovieDeleteToReactiveVariables(movieId: number): void {
		this.movieLocalService.onMovieDeleteToReactiveVariables(movieId);
	}

	/* Methods to manage Movie in Apollo cache */
	onMovieAddToApolloCache(movieInputCreate: MovieInputCreate): void {
		this.movieLocalService.onMovieAddToApolloCache(movieInputCreate);
	}

	onMovieEditToApolloCache(movieInputEdit: MovieInputEdit): void {
		this.movieLocalService.onMovieEditToApolloCache(movieInputEdit);
	}

	onMovieDeleteToApolloCache(movieId: number): void {
		this.movieLocalService.onMovieDeleteToApolloCache(movieId);
	}
}
