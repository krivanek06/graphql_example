import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MovieApiService } from 'src/app/core/api/movie-api.service';
import { MovieDetailsFragment, MovieInfoFragment } from 'src/app/graphql/graphql-custom-backend.service';

@Component({
	selector: 'app-movie-detail-dialog',
	templateUrl: './movie-detail-dialog.component.html',
	styleUrls: ['./movie-detail-dialog.component.scss'],
})
export class MovieDetailDialogComponent implements OnInit {
	movieDetails$!: Observable<MovieDetailsFragment>;
	constructor(
		private dialogRef: MatDialogRef<MovieDetailDialogComponent>,
		private movieApiService: MovieApiService,
		@Inject(MAT_DIALOG_DATA) public data: { movieInfo: MovieInfoFragment }
	) {}

	ngOnInit(): void {
		this.movieDetails$ = this.movieApiService.getMovieById(this.data.movieInfo);
	}

	closeDialog(): void {
		this.dialogRef.close();
	}
}
