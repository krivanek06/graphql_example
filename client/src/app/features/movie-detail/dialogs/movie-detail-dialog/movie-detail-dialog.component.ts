import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieInfoFragment } from 'src/app/graphql/graphql-custom-backend.service';

@Component({
	selector: 'app-movie-detail-dialog',
	templateUrl: './movie-detail-dialog.component.html',
	styleUrls: ['./movie-detail-dialog.component.scss'],
})
export class MovieDetailDialogComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<MovieDetailDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { movieInfoFragment: MovieInfoFragment }
	) {}

	ngOnInit(): void {}

	closeDialog(): void {
		this.dialogRef.close();
	}
}
