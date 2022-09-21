import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieDetailDialogComponent } from './movie-detail-dialog.component';

@NgModule({
	declarations: [MovieDetailDialogComponent],
	imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
	exports: [MovieDetailDialogComponent],
})
export class MovieCommentDialogModule {}
