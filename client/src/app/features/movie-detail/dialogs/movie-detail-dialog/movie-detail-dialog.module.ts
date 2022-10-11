import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MovieDetailDialogComponent } from './movie-detail-dialog.component';
@NgModule({
	declarations: [MovieDetailDialogComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatChipsModule,
		MatDividerModule,
		MatBadgeModule,
		MatInputModule,
	],
	exports: [MovieDetailDialogComponent],
})
export class MovieCommentDialogModule {}
