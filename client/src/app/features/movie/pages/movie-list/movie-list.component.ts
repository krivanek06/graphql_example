import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { MovieApiService } from 'src/app/core/api/movie-api.service';
import { MovieInfoFragment, MovieInputCreate, MovieInputEdit } from 'src/app/graphql/graphql-custom-backend.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
	movies$!: Observable<MovieInfoFragment[]>;
	constructor(private movieApiService: MovieApiService) {}

	ngOnInit(): void {
		this.movies$ = this.movieApiService.getAllMovies();
	}

	async onMovieAdd(movieInputCreate: MovieInputCreate): Promise<void> {
		await firstValueFrom(this.movieApiService.createMovie(movieInputCreate));
	}

	async onEditMovie(movieInputEdit: MovieInputEdit): Promise<void> {
		await firstValueFrom(this.movieApiService.editMovie(movieInputEdit));
	}

	async onMovieDelete(movieId: number): Promise<void> {
		await firstValueFrom(this.movieApiService.deleteMovie(movieId));
	}
}
